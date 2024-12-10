import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:5000/users", {
      headers: { Authorization: Bearer ${localStorage.getItem("token")} },
    });
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h3>User List</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.role}) - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;