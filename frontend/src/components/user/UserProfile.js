// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './UserProfile.css';

// function UserProfile() {
//   const [user, setUser] = useState({});
//   const [editMode, setEditMode] = useState(false);

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('/api/user/profile', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleChange = (e) => {
//     setUser({...user, [e.target.name]: e.target.value});
//   };

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put('/api/user/profile', user, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEditMode(false);
//       alert('Profile updated successfully!');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   return (
//     <div className="profile-container">
//       <h2>User Profile</h2>
//       <div className="profile-form">
//         <label>Name
//           <input type="text" name="name" value={user.name || ''} onChange={handleChange} disabled={!editMode} />
//         </label>
//         <label>Email
//           <input type="email" name="email" value={user.email || ''} disabled />
//         </label>
//         <label>Blood Group
//           <input type="text" name="blood_group" value={user.blood_group || ''} onChange={handleChange} disabled={!editMode} />
//         </label>
//         <label>Phone
//           <input type="text" name="phone" value={user.phone || ''} onChange={handleChange} disabled={!editMode} />
//         </label>

//         {editMode ? (
//           <button onClick={handleSave}>Save Changes</button>
//         ) : (
//           <button onClick={() => setEditMode(true)}>Edit Profile</button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserProfile;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css';
import { FaUserEdit, FaSave, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

function UserProfile() {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/user/update-profile', user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      <div className="profile-card">
        <div className="profile-field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name || ''}
            onChange={handleChange}
            disabled={!editMode}
            className={!editMode ? 'disabled' : ''}
          />
        </div>

        <div className="profile-field">
          <label>Email <FaEnvelope /></label>
          <input
            type="email"
            name="email"
            value={user.email || ''}
            disabled
            className="disabled"
          />
        </div>

        <div className="profile-field">
          <label>Phone <FaPhoneAlt /></label>
          <input
            type="text"
            name="phone"
            value={user.phone || ''}
            onChange={handleChange}
            disabled={!editMode}
            className={!editMode ? 'disabled' : ''}
          />
        </div>

        <div className="profile-buttons">
          {editMode ? (
            <button className="save-btn" onClick={handleSave}>
              <FaSave /> Save Changes
            </button>
          ) : (
            <button className="edit-btn" onClick={() => setEditMode(true)}>
              <FaUserEdit /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
