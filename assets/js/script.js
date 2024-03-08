const endpoint = "https://gist.githubusercontent.com/lugomio/c6baec6f372b3925a3cba4b8583f9ecd/raw/5830a05d68cab9b7a0056f75c6b277d66690f556/municipios.json";
const search = document.querySelector("#search");
const result = document.querySelector(".result");

const cities = [];

fetch(endpoint).then(blob => blob.json()).then(data => cities.push(...data));

search.addEventListener('keyup', showMatches);
search.addEventListener('click', clear);

function findMatches(query, cities) {
    const regex = new RegExp(query, 'gi');
    return cities.filter((city) => {
        return city.municipio.match(regex) || city.estado.match(regex);
    });
}

function showMatches() {
    clear();
    const query = this.value;
    if (!query) return;

    const citiesMatched = findMatches(query, cities);

    if (citiesMatched.length === 0) {
        result.innerHTML = '<li><span>Oops… Nenhuma cidade ou estado foi encontrado com esse nome.</span></li>';
    } else {
        const html = citiesMatched.map(place => {
            return `<li><span>${markMatches(query, place.municipio)} - ${markMatches(query, place.estado)}<span></li>`;
        }).join('');

        result.innerHTML = html;
    }
}

function markMatches(query, place){
    const regex = new RegExp(query, 'gi');
    return place.replaceAll(regex, '<mark>$&</mark>');
}

function clear() {
    result.innerHTML = "";
}