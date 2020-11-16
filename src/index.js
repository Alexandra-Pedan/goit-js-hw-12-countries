import './styles.css';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';

import countryCards from "./templates/country-card.hbs";
import fetchCountries from "./js/fetchCountries";

const debounce = require('lodash.debounce');

const refs = {
    cardContainer: document.querySelector(".js-cards"),
    searchInput: document.querySelector('input'),
}

refs.searchInput.addEventListener("input", debounce(() => {
    searchCountry();
}, 500)
);

function searchCountry() {
    fetchCountries(refs.searchInput.value)
    .then(contries => {
            if (contries.length > 10) {
                error({
                    text: 'Too many matches found. Please enter a more specific query!',
                    type: 'info'
                });
            } else if (contries.length > 1) { 
                renderContriesList(contries);
            } else if (contries.length === 1) { 
                 renderCountry(contries[0])
            }
        })
    .catch(error => console.log(error));
}


function renderCountry(country) {
    const markup = countryCards(country);
    refs.cardContainer.innerHTML = markup;
    console.log(markup);
}


function renderContriesList(countries) {
    let markup = '<ul>';
    for (let country of countries) {
        markup += `<li>${country.name}</li>`;
    }
    markup +='</ul>'
    refs.cardContainer.innerHTML = markup;
}


