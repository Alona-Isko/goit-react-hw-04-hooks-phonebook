import { useState, useEffect } from "react";

const useLocalStorage = (contactsList) => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? contactsList;
  });

  useEffect(() => {
    window.localStorage.setItem(contacts, JSON.stringify('contacts'));
  }, [contacts]);

  return [contacts, setContacts];
};

export default useLocalStorage;