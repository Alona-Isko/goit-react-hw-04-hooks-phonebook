import React, { Component } from "react";
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';
import shortid from 'shortid';

class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    }

    nameId = shortid.generate();
    numberId = shortid.generate();

    handleChange = ev => {
        // console.log(ev.currentTarget);
        // console.log(ev.currentTarget.name);
        // console.log(ev.currentTarget.value);
        const { name, value } = ev.currentTarget;
        this.setState({
        [name]: value,
        });
    }

    handleSubmit = ev => {
        ev.preventDefault();

        this.props.onSubmit(this.state);
        this.reset();
    }

    reset = () => {
        this.setState({
            name: '',
            number: '',
        });
    }

    render() {
        const { name, number } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <label
                    className={s.form__title}
                    htmlFor={this.nameId}
                >
                    Name
                </label>
                    <input
                    type="text"
                    className={s.form__input}
                    name="name"
                    id={this.nameId}
                    value={name}
                    onChange={this.handleChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                    placeholder="Enter name"
                    required
                    />
                
                <label
                    className={s.form__title}
                    htmlFor={this.numberId}
                >
                    Number
                </label>
                    <input
                    type="tel"
                    className={s.form__input}
                    name="number"
                    id={this.numberId}
                    value={number}
                    onChange={this.handleChange}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                    placeholder="Enter phone number"
                    required
                    />
                
                <button
                    className={s.form__button}
                    type="submit"
                >
                    Add contact
                </button>
            </form>
        );
    }
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;