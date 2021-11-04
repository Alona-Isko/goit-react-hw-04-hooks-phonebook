import { useState } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import contactsList from './contacts.json';
import useLocalStorage from './hooks/useLocalStorage';
import s from './App.module.css';
import shortid from 'shortid';


export default function App() {
  const [contacts, setContacts] = useLocalStorage(contactsList);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const contact = {
      id: shortid.generate(),
      name,
      number,
      completed: false,
    };

    setContacts([contact, ...contacts]);
  };

  const changeFilter = (ev) => {
    setFilter(ev.currentTarget.value);
  };

  const visibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

    return (
      <div className={s.container}>
        <h1 className={s.container__title}>Phonebook</h1>
        
        <ContactForm onSubmit={addContact} />

        <div>
          <h2 className={s.Contacts__title}>Contacts</h2>
          <Filter
            value={filter}
            onChange={changeFilter}
          />
          <ContactList
            contacts={visibleContacts()}
            onDeleteContact={deleteContact}
          />
        </div>
      </div>
    );
}

