const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
let search = document.querySelector('.search');
let suggestions = document.querySelector('.suggestions');
let cities = [];


fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));


function filterCities(placeToMatch, cities) {
    return cities.filter(place => {
        let regex = new RegExp(placeToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    })
};

function suggestPlaces() {

    let suggestArray = Array.from(filterCities(this.value, cities));
    let html = suggestArray.map(place => {
        let regex = new RegExp(this.value, 'gi');
        let cityNamme = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        let stateNamme = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return ` <li>
                        <span class="statement">${cityNamme} ${stateNamme}</span> 
                        <span class="population">${numberWithCommas(place.population)}</span> 
                 </li>`
    }).join("");

    suggestions.innerHTML = html;

    if (this.value.length === 0) {
        suggestions.innerHTML = "";
    };

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
search.addEventListener('input', suggestPlaces);