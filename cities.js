const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
let cities = [];
let search = document.querySelector('input');
let suggestion = document.querySelector('.suggestions');

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));


function findMatches(wordToMatch, cities) {

    return cities.filter(place => {
        let regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || StaticRange.city.match(regex);
    })
};