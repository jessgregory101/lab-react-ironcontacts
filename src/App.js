import React, { useState } from "react";
import "./App.css";
import contactsData from "./contacts.json";

function App() {
  const [contacts, setContacts] = useState(contactsData.slice(0, 5));
  const [remainingContacts, setRemainingContacts] = useState(contactsData.slice(5));

  const addRandomContact = () => {
    if (remainingContacts.length === 0) {
      alert("No more contacts to add.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];

    const newContacts = contacts.slice();
    newContacts.push(randomContact);

    setContacts(newContacts);
    
    setRemainingContacts(prevRemainingContacts =>
      prevRemainingContacts.filter(contact => contact.id !== randomContact.id)
    );
  };

  const removeContact = (id) => {
    const newContacts = contacts.slice().filter(contact => contact.id !== id);
    setContacts(newContacts);
  };

  const sortContactsByName = () => {
    setContacts(prevContacts =>
      prevContacts.slice().sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const sortContactsByPopularity = () => {
    setContacts(prevContacts =>
      prevContacts.slice().sort((a, b) => b.popularity - a.popularity)
    );
  };

  return (
    <div className="App">
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortContactsByName}>Sort by Name</button>
      <button onClick={sortContactsByPopularity}>Sort by Popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img src={contact.pictureUrl} alt={contact.name} style={{ width: "50px", height: "auto" }} />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity}</td>
              <td>{contact.wonOscar ? "🏆" : ""}</td>
              <td>{contact.wonEmmy ? "🏆" : ""}</td>
              <td>
                <button onClick={() => removeContact(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
