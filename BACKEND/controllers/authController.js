const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateOTP = require('../utils/otp');
const sendOTPEmail = require('../utils/mailer');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (err, result) => {
      if (result.length > 0) {
        return res.status(400).json({ message: 'Email already exists!' });
      } else {
        db.query(
          'INSERT INTO users (name, email, password, is_active) VALUES (?, ?, ?, ?)',
          [name, email, hashedPassword, false],
          (err, userResult) => {
            if (err) throw err;

            const otp = generateOTP();
            const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

            db.query(
              'INSERT INTO otp_verifications (user_id, otp, expires_at) VALUES (?, ?, ?)',
              [userResult.insertId, otp, expiresAt],
              (err) => {
                if (err) throw err;

                sendOTPEmail(email, otp);
                res.status(200).json({
                  message: 'User registered! OTP sent to email.',
                  userId: userResult.insertId,
                });
              }
            );
          }
        );
      }
    }
  );
};

exports.verifyOTP = (req, res) => {
  const { userId, otp } = req.body;

  db.query(
    'SELECT * FROM otp_verifications WHERE user_id = ? AND otp = ?',
    [userId, otp],
    (err, result) => {
      if (err) throw err;

      if (result.length === 0) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }

      const expiresAt = new Date(result[0].expires_at);
      if (expiresAt < new Date()) {
        return res.status(400).json({ message: 'OTP expired' });
      }

      db.query(
        'UPDATE users SET is_active = ? WHERE id = ?',
        [true, userId],
        (err) => {
          if (err) throw err;

          db.query(
            'DELETE FROM otp_verifications WHERE user_id = ?',
            [userId]
          );
          res.status(200).json({ message: 'OTP verified! You can now log in.' });
        }
      );
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result[0];
    if (!user.is_active) {
      return res.status(400).json({ message: 'Account not verified' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  });
};
