let startedCountries = [
  'germany',
  'USA',
  'brazil',
  'iceland',
  'afghanistan',
  'aland islands',
  'albania',
  'algeria'
];

function showFilterOption() {
  const filterOption = document.querySelector('.filter__option__box');
  filterOption.classList.toggle('show__option');
}

async function getCountriesAPI(countries) {
  try {
    const response = await fetch(
      'https://restcountries.com/v2/name/' + countries
    );
    const data = await response.json();
    return data[0];
  } catch {
    console.log('error');
  }
}

async function getRegionAPI(countries) {
  const response = await fetch(
    'https://restcountries.com/v2/regionalbloc/' + countries
  );
  const data = await response.json();
  return data;
}

function clearDisplay() {
  const container = document.querySelector('.grid__container');
  container.innerHTML = ``;
}

function createCardCountries(countries) {
  const card = document.createElement('div');
  const container = document.querySelector('.grid__container');
  card.className = 'card';
  card.innerHTML = `
          <div class="card__image" id="${countries.name}" onclick="showCountryDetails(this)">
            <img src="${countries.flag}" alt="" />
          </div>
          <h3 class="card__title">${countries.name}</h3>
          <div class="card__details">
            <p><strong>Population:</strong> ${countries.population}</p>
            <p><strong>Region:</strong> ${countries.region}</p>
            <p><strong>Capital:</strong> ${countries.capital}</p>
          </div>`;
  container.append(card);
}

async function showCountryDetails(value) {
  const detail = document.createElement('div');
  const container = document.querySelector('.grid__container');
  const containerCountries = document.querySelector('.container__countries');
  const searchField = document.querySelector('.search__filter__field');
  detail.className = 'detail__container';
  container.style.display = 'none';
  searchField.style.display = 'none';
  const countries = await getCountriesAPI(value.id);
  detail.innerHTML = `
  <button class="btn__back" onclick="backFromDetail(this)"><i class="fa-solid fa-arrow-left-long"></i>Back</button>
   <div class="country__details">
          <div class="detail__image">
            <img src="${countries.flag}" alt="" />
          </div>
          <div class="detail__desc">
            <h1 class="detail__title">${countries.name}</h1>
            <div class="detail__desc__flex">
              <div class="col">
                <p><strong>Native Name:</strong> ${countries.nativeName}</p>
                <p><strong>Population:</strong> ${countries.population}</p>
                <p><strong>Region:</strong> ${countries.region}</p>
                <p><strong>Sub Region:</strong> ${countries.subregion}</p>
                <p><strong>Capital:</strong> ${countries.capital}</p>
              </div>
              <div class="col">
                <p><strong>Top Level Domain:</strong> ${countries.topLevelDomain}</p>
                <p><strong>Curencies:</strong> ${countries.currencies[0].code}</p>
                <p><strong>Languages:</strong> ${countries.languages[0].name}</p>
              </div>
            </div>
          </div>
        </div>
  `;
  containerCountries.append(detail);
}

function backFromDetail(element) {
  const container = document.querySelector('.grid__container');
  container.style.display = 'grid';
  const searchField = document.querySelector('.search__filter__field');
  searchField.style.display = 'flex';
  const parrent = element.parentElement;
  parrent.remove();
}

async function showCountries() {
  clearDisplay();
  for (let i = 0; i < startedCountries.length; i++) {
    const countries = await getCountriesAPI(startedCountries[i]);
    createCardCountries(countries);
  }
}

async function showByRegion(value) {
  clearDisplay();
  const countries = await getRegionAPI(value.id);
  countries.forEach((element) => {
    createCardCountries(element);
  });
  const filterOption = document.querySelector('.filter__option__box');
  filterOption.classList.toggle('show__option');
}
showCountries();

async function searchCountry() {
  const countryName = document.querySelector('#search__input').value;
  const countries = await getCountriesAPI(countryName);
  clearDisplay();
  createCardCountries(countries);
}

const html = document.querySelector('html');
const toggleIcon = document.querySelector('.toggle__icon');
const searchIcon = document.querySelector('.search__icon');
const searchInput = document.querySelector('#search__input');
function toggleMode(checkBox) {
  if (checkBox.checked) {
    html.dataset.colorMode = 'theme2';
    toggleIcon.classList.add('dark');
    searchIcon.classList.add('dark');
    searchInput.classList.add('dark');
  } else {
    html.dataset.colorMode = 'theme1';
    toggleIcon.classList.remove('dark');
    searchIcon.classList.remove('dark');
    searchInput.classList.remove('dark');
  }
}
