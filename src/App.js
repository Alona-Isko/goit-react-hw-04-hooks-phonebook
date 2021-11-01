import React, { Component } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import contacts from './contacts.json';
import s from './App.module.css';
import shortid from 'shortid';


class App extends Component {
  state = {
    contacts: contacts,
    filter: '',
  }

  componentDidMount() {
    console.log('App componentDidMount');

    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    // console.log(parsedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
    // console.log(prevState);
    // console.log(this.state);
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
      completed: false,
    };

    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  }

  changeFilter = (ev) => {
    this.setState({ filter: ev.currentTarget.value });
  }

  visibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };


  render() {
    return (
      <div className={s.container}>
        <h1 className={s.container__title}>Phonebook</h1>
        
        <ContactForm onSubmit={this.addContact} />

        <div>
          <h2 className={s.Contacts__title}>Contacts</h2>
          <Filter
            value={this.state.filter}
            onChange={this.changeFilter}
          />
          <ContactList
            contacts={this.visibleContacts()}
            onDeleteContact={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}

export default App;
