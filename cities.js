const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
let cities = [];
let search = document.querySelector('.search');
let suggestions = document.querySelector('.suggestions');

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        let regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    })
};

function displayMatches(e) {
    let matches = findMatches(this.value, cities);

    let html = matches.map(place => {
        return `
                    <li >
                        <span class="city">${place.city}, ${place.state}</span>
                        <span class="population">${place.population}</span>
                    </li>
                    `
    }).join('');

    suggestions.innerHTML = html;
};

search.addEventListener('input', displayMatches);