import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [clients, setClients] = useState([]);

   useEffect(() => {
    const fetchAllClients = async () => {
      try {
        const res = await axios.get("/clients");
        setClients(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllClients();
  }, []);

  console.log(clients);

   return (
    <div>
      {clients.length > 0 && (
        <ul>
          {clients.map(user => (
            <li key={user.id}>{user.name} {user.last_name} {user.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App