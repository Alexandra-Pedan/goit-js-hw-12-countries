const BASE_URL = 'https://restcountries.eu/rest/v2';

export default function fetchCountries(searchQuery) { 
    return fetch(`${BASE_URL}/name/${searchQuery}`)
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
}