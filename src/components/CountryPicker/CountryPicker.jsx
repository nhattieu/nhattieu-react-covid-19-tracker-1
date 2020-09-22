import React, { useState, useEffect } from 'react';
import { Select, MenuItem } from '@material-ui/core';

import { fetchCountriesData } from '../../api';

import styles from './CountryPicker.module.css';


const CountryPicker = ({ handleCountryChange }) => {

    const [countries, setCountries] = useState([]);
    const [value, setValue] = useState("global");

    useEffect(() => {
        const fetchAPI = async () => {
            setCountries(await fetchCountriesData());
        }
        fetchAPI();
    }, []);

    const getNameCountryByValue = (value) => {
        let result = "";
        countries.forEach(country => {
            if(country.iso2 === value) result = country.name;
        })
        return result;
    }

    const listItem = () => {
        let result = "";
        if(countries.length !== 0) {
            result = countries.map((country, i) => <MenuItem key={i} value={country.iso2} name={country.name}>{country.name}</MenuItem>);
        }
        return result;
    }

    const handleChange = (event) => {
        const { value } = event.target;
        setValue(value);
        const name = getNameCountryByValue(value)
        handleCountryChange(value, name);

    }


    return (
        <div className={styles.container}>
            <Select className={styles.select} variant="outlined" onChange={handleChange} value={value}>
                <MenuItem value="global">Global</MenuItem>
                {listItem()}
            </Select>
        </div>
    )
}

export default CountryPicker;