import React from "react";
import PropTypes from 'prop-types';
import s from './Filter.module.css';

const Filter = ({value, onChange}) => (
    <label className={s.Filter__text}>
        Find contacts by name
        <input
            type="text"
            className={s.Filter__input}
            value={value}
            onChange={onChange}
        />
    </label>
);

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Filter;