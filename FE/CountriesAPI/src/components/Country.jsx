import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link, Routes, Route } from 'react-router-dom'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import './Country.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


function Country(props) {
    const [country, setCountry] = useState([]);
    const [loading, setLoading] = useState(true);
    const [populationData, setPopulationData] = useState([]);
    const { id } = useParams()

    useEffect(() => {

        const FetchinCountries = async () => {
            try {

                let BringinCountries = await fetch(`http://localhost:3000/country-info/${id}`);
                let data = await BringinCountries.json();
                console.log(data)
                setCountry(data)

                setPopulationData(data.populationData);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        FetchinCountries();
    }, [id])

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!country) {
        return <div>No se encontró el país.</div>;
    }

    const years = populationData ? populationData.map(entry => entry.year) : [];
    const populations = populationData ? populationData.map(entry => entry.value) : [];
    console.log(populations);
    

    const data = {
        labels: years,
        datasets: [
            {
                label: 'Población',
                data: populations,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };
    console.log(data);
    

    return (
        <>
        <Link to={`/`}> Volver a lista de paises </Link>
            <div className='title'>PAIS: {country.name}</div>
            <img src={country.flagUrl} alt="" />
            <h2>Paises Fronterizos:</h2>
            <ul className='country'>
                {country.borders && country.borders.length > 0 ? (
                    country.borders.map((borderCountry) => (
                        <li className='liCountry' key={borderCountry.countryCode}>
                            <Link to={`/country/${borderCountry.countryCode}`}>
                                {borderCountry.commonName}
                            </Link>
                        </li>
                    ))
                ) : (
                    <li>No hay países vecinos.</li> 
                )}
            </ul>
            <h2>Poblacion a traves del tiempo</h2>
            {populations.length > 0 ? (
                <Bar data={data} />
            ) : (
                <div>No hay datos de población disponibles.</div>
            )}
        </>
    )
}

export default Country