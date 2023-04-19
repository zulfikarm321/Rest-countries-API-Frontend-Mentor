function switchTheme(toggle) {
  const html = document.querySelector('html');
  const toggleText = document.querySelector('.toggle_text');

  if (toggle.checked) {
    html.dataset.colorMode = 'dark';
    toggleText.innerText = `Dark Mode`;
  } else {
    html.dataset.colorMode = 'light';
    toggleText.innerText = `Light Mode`;
  }
}

document.addEventListener('click', function (e) {
  const dropdown = document.querySelector('#dropdown_checkbox');
  const dropdownMenu = document.querySelector('.dropdown_menu');

  if (e.target !== dropdown) {
    dropdownMenu.classList.remove('active');
  } else {
    dropdownMenu.classList.toggle('active');
  }
});

function getData(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Terjadi kesalahan:', error);
    });
}

async function renderContent(url) {
  getData(url).then((data) => {
    const main = document.querySelector('main');
    main.innerHTML = '';
    const boxWrapper = document.createElement('div');
    boxWrapper.className = 'countries_box_wrapper';

    data.forEach((countries) => {
      let name;
      typeof countries.name !== 'object'
        ? (name = countries.name)
        : (name = countries.name.common);
      const flag = countries.flags.svg;
      const population = countries.population;
      const region = countries.region;
      const capital = countries.capital;

      const box = document.createElement('div');
      box.className = 'countries_box';
      box.setAttribute('onclick', 'renderDetail(this)');
      box.id = name;
      box.innerHTML = `
            <div class="countries_box_flag">
              <img src="${flag}" alt="">
            </div>
            <div class="countries_box_content">
              <h3 class="countries_box_name">${name}</h3>
              <div class="countries_box_details">
                <p>Population: <span>${population}</span></p>
                <p>Region: <span>${region}</span></p>
                <p>Capital: <span>${capital}</span></p>
              </div>
            </div>
          `;
      // Render to main element
      boxWrapper.appendChild(box);
    });
    main.append(boxWrapper);
  });
}

function renderByRegion(el) {
  document.querySelector('.dropdown_label').innerText = el.innerText;

  renderContent('https://restcountries.com/v3.1/region/' + el.id);
}

function backButton() {
  const boxWrapper = document.querySelector('.countries_box_wrapper');
  const countriesDetails = document.querySelector('.countries_details');
  countriesDetails.remove();
  boxWrapper.style.display = 'grid';
}

function renderDetail(el) {
  const main = document.querySelector('main');
  const boxWrapper = document.querySelector('.countries_box_wrapper');
  boxWrapper.style.display = 'none';

  getData('https://restcountries.com/v2/name/' + el.id).then((data) => {
    const country = data[0];
    let name;
    typeof country.name !== 'object'
      ? (name = country.name)
      : (name = country.name.common);
    const nativeName = country.nativeName;
    const subRegion = country.subregion;
    const population = country.population;
    const region = country.region;
    const capital = country.capital;
    const topLevelDomain = country.topLevelDomain;
    const currencies = country.currencies[0].code || null;
    const flag = country.flags.svg;

    let languages = ``;
    const languagesArr = country.languages;
    for (let i = 0; i < languagesArr.length; i++) {
      if (i === languagesArr.length - 1) {
        languages += `<span>${languagesArr[i].name} </span>`;
      } else {
        languages += `<span>${languagesArr[i].name}, </span>`;
      }
    }

    const borderCountries = [];

    const countriesDetails = document.createElement('div');
    countriesDetails.className = 'countries_details';
    countriesDetails.innerHTML = `
          <button class="btn_back" onclick="backButton()">
            <div class="btn_back_icon">
              <i class="fa-solid fa-arrow-left"></i>
            </div>
            Back
          </button>
          <section class="countries_details_content">
            <div class="countries_details_flag">
              <img src="${flag}" alt="">
            </div>
            <div class="countries_details_info">
              <h1>${name}</h1>
              <div class="row">
                <div class="col">
                  <p>Native Name: <span>${nativeName}</span></p>
                  <p>Population: <span>${population}</span></p>
                  <p>Region: <span>${region}</span></p>
                  <p>Sub Region: <span>${subRegion}</span></p>
                  <p>Capital: <span>${capital}</span></p>
                </div>
                <div class="col">
                  <p>Top Level Domain: <span>${topLevelDomain}</span></p>
                  <p>Currencies: <span>${currencies}</span></p>
                  <p>Languages: <span>${languages}</span></p>
                </div>
              </div>
              <div class="border_countries">
                <p>Border Countries</p>
                <div class="col">
                  <p>France</p>
                  <p>Germany</p>
                  <p>France</p>
                </div>
              </div>
            </div>
          </section>
      `;
    main.append(countriesDetails);
  });
}

renderContent('./data.json');
