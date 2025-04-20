import React, { useEffect, useState } from "react";

function AddStaff() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users (only those who are not staff/admin)
  useEffect(() => {
    fetch("http://localhost:5000/api/users") // Adjust API route as needed
      .then((res) => res.json())
      .then((data) => setUsers(data.filter(user => user.role === "user")))
      .catch((err) => console.error(err));
  }, []);

  const handlePromote = (userId) => {
    setLoading(true);
    fetch(`http://localhost:5000/api/admin/add-staff/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        alert("User promoted to staff!");
        setUsers(users.filter(user => user.id !== userId)); // Remove promoted user from list
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container">
      <h2>Promote Users to Staff</h2>
      {loading && <p>Processing...</p>}
      {users.length === 0 ? <p>No users available for promotion.</p> : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handlePromote(user.id)}>Promote to Staff</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AddStaff;
