import React, { useState, useEffect } from "react";
import axios from "axios";
import questions from "../.././../data/questions.json";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/contact")
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, []);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="flex">
      <div className="w-1/2">
        <ul className="flex flex-col">
          {contacts.map((contact) => (
            <li
              className={`cursor-pointer border-[1px] px-4 py-2 hover:bg-slate-200 ${
                selectedContact && selectedContact._id == contact._id
                  ? "bg-slate-400"
                  : ""
              }`}
              key={contact.id}
              onClick={() => handleContactClick(contact)}
            >
              {contact.user.email}
            </li>
          ))}
        </ul>
      </div>
      {selectedContact && (
        <div className="w-1/2 px-5">
          <ul className="flex flex-col gap-5">
            {selectedContact.questions.map((answer, index) => (
              <>
                <div className="border-2 p-4 rounded">
                  <label>{`${index + 1}) ` + questions[index].question}</label>
                  <li className="font-bold" key={index}>
                    {`• ` + answer}
                  </li>
                </div>
              </>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContactList;
