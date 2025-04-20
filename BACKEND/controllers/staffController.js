const db = require('../models/db'); // MySQL connection

// Register a new donor
exports.registerDonor = (req, res) => {
  // console.log("here2");
  const { user_id, name, dob, gender, blood_group, contact_number, address, medical_history } = req.body;
  const query = `
    INSERT INTO donors (user_id, name, dob, gender, blood_group, contact_number, address, medical_history)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  // console.log("here1");
  db.query(query, [user_id, name, dob, gender, blood_group, contact_number, address, medical_history], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Donor registered successfully" });
  });
};

// Record a new donation
// Record a new donation
exports.addDonation = (req, res) => {
  const { donor_id, volume, blood_group } = req.body;

  console.log("Decoded JWT:", req.user); // Debugging
  const staff_id = req.user.userId;  // Getting staff_id from JWT

  if (!donor_id || !volume || !staff_id || !blood_group) {
    return res.status(400).json({ error: "All fields are required" });
  }

  console.log("Recording donation...");
  const query = `
    INSERT INTO donations (donor_id, donation_date, volume, staff_id, created_at, updated_at)
    VALUES (?, NOW(), ?, ?, NOW(), NOW())
  `;

  db.query(query, [donor_id, volume, staff_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    const donation_id = result.insertId;
    console.log(`Donation recorded with ID: ${donation_id}`);

    // Add blood to stock
    const stockQuery = `
      INSERT INTO blood_stock (donation_id, blood_group, status, volume, expiry_date)
      VALUES (?, ?, 'Available', ?, DATE_ADD(NOW(), INTERVAL 42 DAY))  -- Assuming blood expires in 42 days
    `;

    db.query(stockQuery, [donation_id, blood_group, volume], (err, stockResult) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({ message: "Donation recorded and stock updated" });
    });
  });
};


// View blood stock grouped by blood groups
exports.viewStock = (req, res) => {
  const query = `
    SELECT blood_group, status, SUM(volume) AS total_volume, COUNT(*) AS total_units
    FROM blood_stock
    WHERE status = 'Available'
    GROUP BY blood_group, status
    ORDER BY blood_group;
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Get recipient requests (Pending or Approved)
exports.getRecipientRequests = (req, res) => {
  const query = `
    SELECT * FROM recipients 
    WHERE status IN ('Pending', 'Approved')
    ORDER BY request_date DESC;
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Approve, reject, or complete a recipient request
exports.updateRequest = (req, res) => {
  const { request_id, status } = req.body;
  const staff_id = req.user.userId;
  // console.log(staff_id);

  const getRequestQuery = "SELECT blood_group, volume_required FROM recipients WHERE recipient_id = ?";

  db.query(getRequestQuery, [request_id], (err, requestResult) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!requestResult.length) return res.status(404).json({ error: "Request not found" });

    const { blood_group, volume_required } = requestResult[0];
    // console.log("here");
    if (status === 'Approved') {
      // Start Transaction
      db.beginTransaction((err) => {
        if (err) return res.status(500).json({ error: err.message });

        // Check if enough blood stock is available
        const checkStockQuery = "SELECT stock_id, volume FROM blood_stock WHERE blood_group = ? AND status = 'Available' ORDER BY expiry_date ASC";
        db.query(checkStockQuery, [blood_group], (err, stockResult) => {
          if (err) return db.rollback(() => res.status(500).json({ error: err.message }));

          let remainingVolume = volume_required;
          const stockToUpdate = [];

          for (const stock of stockResult) {
            if (remainingVolume <= 0) break;
            const usedVolume = Math.min(remainingVolume, stock.volume);
            stockToUpdate.push({ stock_id: stock.stock_id, usedVolume });
            remainingVolume -= usedVolume;
          }

          if (remainingVolume > 0) {
            // console.log("here3");
            return db.rollback(() => res.status(400).json({ error: "Insufficient stock available" }));
          }

          // Deduct stock
          let updateStockQueries = stockToUpdate.map(({ stock_id, usedVolume }) => {
            return new Promise((resolve, reject) => {
              db.query(
                "UPDATE blood_stock SET volume = volume - ?, status = CASE WHEN volume - ? = 0 THEN 'Used' ELSE status END WHERE stock_id = ?",
                [usedVolume, usedVolume, stock_id],
                (err) => (err ? reject(err) : resolve())
              );
            });
          });

          // Execute all stock updates
          Promise.all(updateStockQueries)
            .then(() => {
              // Update recipient request status
              const updateRequestQuery = "UPDATE recipients SET status = ?, staff_id = ? WHERE recipient_id = ?";
              db.query(updateRequestQuery, [status, staff_id, request_id], (err) => {
                if (err) return db.rollback(() => res.status(500).json({ error: err.message }));

                db.commit((err) => {
                  if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
                  res.status(200).json({ message: `Request ${status} successfully` });
                });
              });
            })
            .catch((err) => {
              db.rollback(() => res.status(500).json({ error: err.message }));
            });
        });
      });
    } else {
      console.log("here1");
      // If rejected or completed, just update the request status
      const updateRequestQuery = "UPDATE recipients SET status = ?, staff_id = ? WHERE recipient_id = ?";
      db.query(updateRequestQuery, [status, staff_id, request_id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: `Request ${status} successfully` });
      });
    }
  });
};
