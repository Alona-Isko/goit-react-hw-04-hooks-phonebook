import PropTypes from 'prop-types';
import s from './ContactList.module.css';

function ContactList({ contacts, onDeleteContact }) {
    return (
        <ul className={s.ContactList__container}>
            {contacts.map(({ id, name, number }) => (
                <li
                    className={s.ContactList__item}
                    key={id}>
                    <p className={s.ContactList__text}>{name}: {number}</p>
                    <button
                        className={s.ContactList__button}
                        onClick={() => onDeleteContact(id)}>
                        X
                    </button>
                </li>
            ))}
        </ul>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ),
    onDeleteContact: PropTypes.func.isRequired,
}

export default ContactList;