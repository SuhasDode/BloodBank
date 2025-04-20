const db = require('../models/db');
const jwt = require('jsonwebtoken');
// Send Blood Request
// // Send Blood Request
// exports.sendBloodRequest = (req, res) => {
//   const userId = req.user.userId; // extracted from auth middleware
//   const { name, age, gender, blood_group, contact_number, address, volume_required } = req.body;

//   if (!name || !age || !gender || !blood_group || !contact_number || !volume_required) {
//     return res.status(400).json({ message: 'Missing required fields' });
//   }

//   const requestDate = new Date();

//   const query = `
//     INSERT INTO recipients (user_id, name, age, gender, blood_group, contact_number, address, request_date, volume_required)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   const values = [userId, name, age, gender, blood_group, contact_number, address, requestDate, volume_required];

//   db.query(query, values, (err, result) => {
//     if (err) {
//       console.log('Error sending blood request:', err);
//       return res.status(500).json({ message: 'Failed to send blood request' });
//     }

//     res.status(201).json({ message: 'Blood request submitted successfully' });
//   });
// };


exports.sendBloodRequest = (req, res) => {
  const userId = req.user.userId; // extracted from auth middleware
  const {
    name,
    age,
    gender,
    blood_group,
    contact_number,
    address,
    volume_required, 
    hospital,     // newly added
    purpose       // newly added
  } = req.body;

  // Validate all required fields
  if (!name || !age || !gender || !blood_group || !contact_number || !address || !volume_required || !hospital || !purpose) {
    console.log("eroor");
    return res.status(400).json({ message: 'Missing required fields' });
    
  }

  const requestDate = new Date();

  const query = `
    INSERT INTO recipients 
    (user_id, name, age, gender, blood_group, contact_number, address, request_date, volume_required, hospital, purpose)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    userId,
    name,
    age,
    gender,
    blood_group,
    contact_number,
    address,
    requestDate,
    volume_required, 
    hospital,
    purpose
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.log('Error sending blood request:', err);
      return res.status(500).json({ message: 'Failed to send blood request' });
    }

    res.status(201).json({ message: 'Blood request submitted successfully' });
  });
};


// Get Donation History
exports.getDonationHistory = (req, res) => {
  const userId = req.user.userId; 
  const donorQuery = 'SELECT donor_id FROM donors WHERE user_id = ?';

  db.query(donorQuery, [userId], (err, donorResults) => {
    if (err) {
      console.error('Error fetching donor:', err);
      return res.status(500).json({ message: 'Failed to retrieve donation history' });
    }

    if (donorResults.length === 0) { 
      return res.status(404).json({ message: 'You are not registered as a donor' });
    }

    const donorId = donorResults[0].donor_id;

    const donationsQuery = `
      SELECT * FROM donations
      WHERE donor_id = ?
      ORDER BY donation_date DESC
    `;

    db.query(donationsQuery, [donorId], (err, donationResults) => {
      if (err) {
        console.error('Error fetching donation history:', err);
        return res.status(500).json({ message: 'Failed to retrieve donation history' });
      }

      res.status(200).json(donationResults);
    });
  });
};


// View Own Requests
// Get My Blood Requests
exports.getMyRequests = (req, res) => {
  const userId = req.user.userId;

  const query = `
    SELECT * FROM recipients
    WHERE user_id = ?
    ORDER BY request_date DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching requests:', err);
      return res.status(500).json({ message: 'Failed to fetch requests' });
    }

    res.status(200).json(results);
  });
};


// Update Profile
exports.updateProfile = (req, res) => {
  const userId = req.user.userId;
  const { name, contact_number, address } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const updateUserQuery = `
    UPDATE users
    SET name = ?
    WHERE id = ?
  `;

  db.query(updateUserQuery, [name, userId], (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ message: 'Failed to update profile' });
    }

    const updateDonorQuery = `
      UPDATE donors
      SET contact_number = ?, address = ?
      WHERE user_id = ?
    `;

    db.query(updateDonorQuery, [contact_number, address, userId], (err, donorResult) => {
      if (err) {
        console.error('Error updating donor info:', err);
        return res.status(500).json({ message: 'Failed to update donor information' });
      }

      res.status(200).json({ message: 'Profile updated successfully' });
    });
  });
};


// // Get Profile Info
// exports.profile = (req, res) => {
//   const userId = req.user.userId;

//   const userQuery = 'SELECT id, name, email, role, is_active FROM users WHERE id = ?';

//   db.query(userQuery, [userId], (err, userResult) => {
//     if (err) {
//       console.error('Error fetching profile:', err);
//       return res.status(500).json({ message: 'Failed to retrieve profile' });
//     }

//     if (userResult.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const userProfile = userResult[0];

//     const donorQuery = 'SELECT * FROM donors WHERE user_id = ?';

//     db.query(donorQuery, [userId], (err, donorResult) => {
//       if (err) {
//         console.error('Error fetching donor profile:', err);
//         return res.status(500).json({ message: 'Failed to retrieve donor profile' });
//       }

//       userProfile.donorInfo = donorResult.length > 0 ? donorResult[0] : null;

//       res.status(200).json(userProfile);
//     });
//   });
// };


// Get Profile Info
exports.profile = (req, res) => {
  const userId = req.user.userId;

  const userQuery = 'SELECT id, name, email, role, is_active FROM users WHERE id = ?';

  db.query(userQuery, [userId], (err, userResult) => {
    if (err) {
      console.error('Error fetching profile:', err);
      return res.status(500).json({ message: 'Failed to retrieve profile' });
    }

    if (userResult.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userProfile = userResult[0];

    const donorQuery = 'SELECT donor_id FROM donors WHERE user_id = ?';

    db.query(donorQuery, [userId], (err, donorResult) => {
      if (err) {
        console.error('Error fetching donor profile:', err);
        return res.status(500).json({ message: 'Failed to retrieve donor profile' });
      }

      if (donorResult.length === 0) {
        return res.status(200).json({ ...userProfile, total_donations: 0 });
      }

      const donorId = donorResult[0].donor_id ;

      const donationCountQuery = 'SELECT COUNT(*) AS total_donations FROM donations WHERE donor_id = ?';

      db.query(donationCountQuery, [donorId], (err, donationResult) => {
        if (err) {
          console.error('Error fetching donation count:', err);
          return res.status(500).json({ message: 'Failed to retrieve donation count' });
        }

        const totalDonations = donationResult[0].total_donations || 0;
        res.status(200).json({ ...userProfile, total_donations: totalDonations });
      });
    });
  });
};
