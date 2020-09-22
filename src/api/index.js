import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async () => {
    try {
        const { data : { confirmed, recovered, deaths, lastUpdate }} = await axios.get(url);
        return { confirmed, recovered, deaths, lastUpdate }
    } catch (error) {
        
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        return data;
    } catch (error) {
        
    }
}

export const fetchCountriesData = async () => {
    try {
        const { data } = await axios.get(`${url}/countries`);
        return data.countries;
    } catch (error) {
        
    }
}

export const fetchCountryData = async (country) => {
    try {
        const { data } = await axios.get(`${url}/countries/${country}`);
        console.log(data);
        return data;
    } catch (error) {
        
    }
}