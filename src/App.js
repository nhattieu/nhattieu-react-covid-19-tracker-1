import React, { useState, useEffect } from "react";
import { Cards, Chart, CountryPicker } from "./components";

import { fetchData, fetchCountryData } from './api';

import styles from "./App.module.css";


function App() {

	const [data, setData] = useState({});
	const [valueCountry, setValueCountry] = useState("");
	const [nameCountry, setNameCountry] = useState("");

    useEffect(() => {
        const fetchAPI = async () => {
            setData(await fetchData());
        }
        fetchAPI();

	}, []);

	const handleCountryChange = async (value, name) => {
		setValueCountry(value);
		setNameCountry(name);
		value === "" || value === "global" ? setData(await fetchData()) : setData(await fetchCountryData(value));
	};

	return (
		<div className={styles.container}>
			<img className={styles.logo} src={process.env.PUBLIC_URL + 'logo.png'} />
			<Cards data={data} />
			<CountryPicker handleCountryChange={handleCountryChange} />
			<Chart data={data} valueCountry={valueCountry} nameCountry={nameCountry} />
		</div>
	);
}

export default App;
