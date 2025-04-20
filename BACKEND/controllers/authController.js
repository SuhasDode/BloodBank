const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateOTP = require('../utils/otp');
const sendOTPEmail = require('../utils/mailer');

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (result.length > 0) {
        return res.status(400).json({ message: 'Email already exists!' });
      }

      db.query(
        'INSERT INTO users (name, email, password, is_active) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, false],
        (err, userResult) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to register user' });
          }

          const otp = generateOTP();
          const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

          db.query(
            'INSERT INTO otp_verifications (user_id, otp, expires_at) VALUES (?, ?, ?)',
            [userResult.insertId, otp, expiresAt],
            (err) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Failed to save OTP' });
              }

              sendOTPEmail(email, otp);

              return res.status(200).json({
                message: 'User registered! OTP sent to email.',
                userId: userResult.insertId,
              });
            }
          );
        }
      );
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// VERIFY OTP
exports.verifyOTP = (req, res) => {
  const { userId, otp } = req.body;

  db.query(
    'SELECT * FROM otp_verifications WHERE user_id = ? AND otp = ?',
    [userId, otp],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (result.length === 0) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }

      const expiresAt = new Date(result[0].expires_at);
      if (expiresAt < new Date()) {
        return res.status(400).json({ message: 'OTP expired' });
      }

      db.query('UPDATE users SET is_active = ? WHERE id = ?', [true, userId], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Failed to activate user' });
        }

        db.query('DELETE FROM otp_verifications WHERE user_id = ?', [userId], (err) => {
          if (err) {
            console.error(err);
            // Not critical, so we don't block here
          }

          return res.status(200).json({ message: 'OTP verified! You can now log in.' });
        });
      });
    }
  );
};

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result[0];

    if (!user.is_active) {
      return res.status(400).json({ message: 'Account not verified' });
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id,role: user.role }, process.env.JWT_SECRET, { expiresIn: '4h' });

      return res.status(200).json({ message: 'Login successful', token,role:user.role });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
};

//Donor Register
exports.registerDonor = (req, res) => {
  const { name, dob, bloodGroup, contact, medicalHistory } = req.body;

  // Input validation here...

  db.query('INSERT INTO donors (name, dob, bloodGroup, contact, medicalHistory) VALUES (?, ?, ?, ?, ?)',
    [name, dob, bloodGroup, contact, medicalHistory],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error' });

      res.status(200).json({ message: 'Successfully Registered', donorId: result.insertId });
    });
};

  
exports.logout = (navigate) => {
  localStorage.removeItem('token');     // Remove the JWT token
  localStorage.removeItem('role');   // Optional: if you store user roles or other data
  localStorage.removeItem('userId');
  navigate('/login');                    // Redirect to login page
};