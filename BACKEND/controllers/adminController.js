const db = require('../models/db');

// GET all users
exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(200).json(result);
  });
};


exports.AddStaff = (req, res) => {
  const { id } = req.params;

  // Check if user exists
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    // Update user role to 'staff'
    db.query('UPDATE users SET role = "staff" WHERE id = ?', [id], (updateErr) => {
      if (updateErr) return res.status(500).json({ error: updateErr.message });
      res.json({ message: 'User promoted to staff successfully' });
    });
  });
};
// GET user by ID
exports.getUserById = (req, res) => {
  const { userId } = req.params;

  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user by ID:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(result[0]);
  });
};

// DELETE user by ID
exports.deleteUser = (req, res) => {
  const { userId } = req.params;

  db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found or already deleted' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  });
};

// GET all donors
exports.getAllDonors = (req, res) => {
  db.query('SELECT * FROM donors', (err, result) => {
    if (err) {
      console.error('Error fetching donors:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(200).json(result);
  });
};

// GET donor by ID
exports.getDonorById = (req, res) => {
  const { donorId } = req.params;

  db.query('SELECT * FROM donors WHERE id = ?', [donorId], (err, result) => {
    if (err) {
      console.error('Error fetching donor by ID:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    res.status(200).json(result[0]);
  });
};

// DELETE donor by ID
exports.deleteDonor = (req, res) => {
  const { donorId } = req.params;

  db.query('DELETE FROM donors WHERE id = ?', [donorId], (err, result) => {
    if (err) {
      console.error('Error deleting donor:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Donor not found or already deleted' });
    }

    res.status(200).json({ message: 'Donor deleted successfully' });
  });
};

// GET blood stock (all)
exports.getBloodStock = (req, res) => {
  db.query('SELECT * FROM blood_stock', (err, result) => {
    if (err) {
      console.error('Error fetching blood stock:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(200).json(result);
  });
};

// ADD new blood stock entry
exports.addBloodStock = (req, res) => {
  const { blood_group, quantity } = req.body;

  db.query(
    'INSERT INTO blood_stock (blood_group, quantity) VALUES (?, ?)',
    [blood_group, quantity],
    (err, result) => {
      if (err) {
        console.error('Error adding blood stock:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      res.status(200).json({ message: 'Blood stock added successfully', stockId: result.insertId });
    }
  );
};

// UPDATE blood stock quantity
exports.updateBloodStock = (req, res) => {
  const { stockId } = req.params;
  const { quantity } = req.body;

  db.query(
    'UPDATE blood_stock SET quantity = ? WHERE id = ?',
    [quantity, stockId],
    (err, result) => {
      if (err) {
        console.error('Error updating blood stock:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Blood stock not found' });
      }

      res.status(200).json({ message: 'Blood stock updated successfully' });
    }
  );
};

// DELETE blood stock entry
exports.deleteBloodStock = (req, res) => {
  const { stockId } = req.params;

  db.query('DELETE FROM blood_stock WHERE id = ?', [stockId], (err, result) => {
    if (err) {
      console.error('Error deleting blood stock:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Blood stock not found or already deleted' });
    }

    res.status(200).json({ message: 'Blood stock deleted successfully' });
  });
};
// === Recipient Requests ===

// GET all recipient requests
exports.getRecipientRequests = (req, res) => {
  db.query('SELECT * FROM recipients WHERE status = "Pending"', (err, result) => {
    if (err) {
      console.error('Error fetching recipient requests:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(200).json(result);
  });
};

// APPROVE recipient request
exports.approveRecipientRequest = (req, res) => {
  const { recipientId } = req.params;

  db.query(
    'UPDATE recipients SET status = ? WHERE id = ?',
    ['Approved', recipientId],
    (err, result) => {
      if (err) {
        console.error('Error approving recipient request:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Recipient request not found' });
      }

      res.status(200).json({ message: 'Recipient request approved successfully' });
    }
  );
};

// REJECT recipient request
exports.rejectRecipientRequest = (req, res) => {
  const { recipientId } = req.params;

  db.query(
    'UPDATE recipients SET status = ? WHERE id = ?',
    ['Rejected', recipientId],
    (err, result) => {
      if (err) {
        console.error('Error rejecting recipient request:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Recipient request not found' });
      }

      res.status(200).json({ message: 'Recipient request rejected successfully' });
    }
  );
};

// === Donations ===

// GET all donations
exports.getDonations = (req, res) => {
  db.query('SELECT * FROM donations', (err, result) => {
    if (err) {
      console.error('Error fetching donations:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(200).json(result);
  });
};

// === Statistics ===

// GET statistics overview
exports.getStatistics = async (req, res) => {
  try {
    const [users] = await db.promise().query("SELECT COUNT(*) AS totalUsers FROM users");
    const [donors] = await db.promise().query("SELECT COUNT(*) AS totalDonors FROM donors");
    const [recipients] = await db.promise().query("SELECT COUNT(*) AS totalRecipients FROM recipients");
    const [donations] = await db.promise().query("SELECT COUNT(*) AS totalDonations FROM donations");
    const [bloodStock] = await db.promise().query("SELECT SUM(volume) AS totalUnits FROM donations");
    const [pendingRequests] = await db.promise().query("SELECT COUNT(*) AS pendingRequests FROM recipients WHERE status = 'pending'");

    res.status(200).json({
      totalUsers: users[0].totalUsers,
      totalDonors: donors[0].totalDonors,
      totalRecipients: recipients[0].totalRecipients,
      totalDonations: donations[0].totalDonations,
      totalUnits: bloodStock[0].totalUnits || 0,
      pendingRequests: pendingRequests[0].pendingRequests || 0,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ message: "Database error" });
  }
};

// === Generate Report ===
exports.generateReport = async (req, res) => {
  try {
    const [donations] = await db.promise().query("SELECT * FROM donations");
    const [recipients] = await db.promise().query("SELECT * FROM recipients");
    const [donors] = await db.promise().query("SELECT * FROM donors");

    res.status(200).json({
      message: "Report generated successfully",
      report: { donations, recipients, donors },
    });
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ message: "Database error" });
  }
};

exports.getHistory = (req, res) => {
  const { filter } = req.query;
  let requestDateCondition = "";
  let donationDateCondition = "";

  if (filter === "15") {
    requestDateCondition = "WHERE request_date >= NOW() - INTERVAL 15 DAY";
    donationDateCondition = "WHERE donation_date >= NOW() - INTERVAL 15 DAY";
  } else if (filter === "30") {
    requestDateCondition = "WHERE request_date >= NOW() - INTERVAL 30 DAY";
    donationDateCondition = "WHERE donation_date >= NOW() - INTERVAL 30 DAY";
  }

  const requestsQuery = `
    SELECT recipient_id AS id, name, blood_group, volume_required AS volume, status, request_date AS date 
    FROM recipients ${requestDateCondition} 
    ORDER BY date DESC
  `;

  const donationsQuery = `
    SELECT donation_id AS id, donors.name, donors.blood_group, donations.volume, 'Completed' AS status, donations.donation_date AS date 
    FROM donations 
    JOIN donors ON donations.donor_id = donors.donor_id 
    ${donationDateCondition} 
    ORDER BY date DESC
  `;

  db.query(requestsQuery, (err, requests) => {
    if (err) {
      console.error("Error fetching requests:", err);
      return res.status(500).json({ message: "Database error" });
    }
    db.query(donationsQuery, (err, donations) => {
      if (err) {
        console.error("Error fetching donations:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(200).json({ requests, donations });
    });
  });
};

exports.GetExpiry = async (req, res) => {
  try {
    console.log("🔍 Fetching Expiring Blood Stocks...");

    // Use promise-based query
    const [results] = await db.promise().query(
      `SELECT stock_id, donation_id, blood_group, status, volume, expiry_date
       FROM blood_stock
       WHERE expiry_date BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 7 DAY)
       ORDER BY expiry_date ASC`
    );

    console.log("✅ Expiring Blood Stocks Retrieved:", results);

    res.status(200).json(results);
  } catch (error) {
    console.error("🔥 Error fetching expiring blood stock:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};
