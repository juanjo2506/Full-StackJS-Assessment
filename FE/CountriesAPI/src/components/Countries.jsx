import { useState, useEffect } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import './Countries.css'


import React from 'react'

function Countries() {
    const [countries, setCountries] = useState([]);

    useEffect(() => {

        const FetchinCountries = async () => {
            try {

                let BringinCountries = await fetch("http://localhost:3000/countries");
                let data = await BringinCountries.json();
                console.log(data.countries);

                setCountries(data.countries)

            } catch (error) {
                console.log(error);
            }
        }
        FetchinCountries();
    }, [])

    return (
        <>

            <h2>Lista de paises</h2>

            <ul className='countries'>

                {countries.map((country) =>
                    <li key={country.countryCode}>
                        <Link to={`/country/${country.countryCode}`}>{country.name}</Link>
                    </li>
                )}
            </ul>
        </>
    )
}

export default Countries