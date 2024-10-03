const express = require('express');
const corsMiddleware = require('./middlewares/Cors.js');

const app = express();
app.use(express.json());
app.use(corsMiddleware());

app.get("/countries", async (req, res) => {
    try {
        const response = await fetch("https://date.nager.at/api/v3/AvailableCountries")
        const countries = await response.json();
        res.status(200).json({ countries });

    } catch (error) {
        res.send(error)

    }

})

app.get('/country-info/:id', async (req, res) => {
    const countryId = req.params.id

    try {
        const countryInfoResponse = await fetch(`https://date.nager.at/api/v3/CountryInfo/${countryId}`);
        const countryInfo = await countryInfoResponse.json();
        const countryName = countryInfo.commonName
        const countryBorders = countryInfo.borders


        const populationResponse = await fetch('https://countriesnow.space/api/v0.1/countries/population');
        const populationData = await populationResponse.json();
        const countryPopulation = populationData.data.find(country => country.country === countryName);
        const population = countryPopulation ? countryPopulation.populationCounts : null;



        const flagResponse = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images');
        const flagData = await flagResponse.json();
        const countryFlag = flagData.data.find(flag => flag.name === countryName);
        const flagUrl = countryFlag ? countryFlag.flag : null;

        // Construir el objeto con los detalles del país
        const countryDetails = {
            name: countryName,
            borders: countryBorders,
            populationData: population,
            flagUrl: flagUrl
        };

        // Enviar la respuesta con la información del país
        res.status(200).json(countryDetails);
    } catch (error) {
        res.send(error)
    }

})

app.listen(3000, () => {
    console.log('Servidor inicializado en el puerto http://localhost:3000');
});
