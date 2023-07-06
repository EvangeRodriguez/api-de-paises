function getCountry() {
    const countryList = document.getElementById('country-list')  //hacer referencia al HTML
    const url = 'https://restcountries.com/v3.1/all'  //url de la API
    //funcion para obtener los paises
    fetch(url)//hacer la peticion
      .then(response => response.json())//convertir la respuesta a json
      .then(paises => {//recorrer el json
        console.log(paises)//imprimir en consola
        paises.forEach(pais => {//recorrer el json
          const list = document.createElement('li') //crear un elemento li
          list.textContent = pais.name.common;//agregar el nombre del pais
          const flagImg = document.createElement('img')//crear un elemento img
          flagImg.src = pais.flags.png//agregar la imagen del pais
          list.appendChild(flagImg)//agregar la imagen al li
          countryList.appendChild(list)//agregar el li al ul
          list.addEventListener('mouseover', () => {//agregar un evento al li
            getNeigCountries(pais.cca3)//llamar a la funcion para obtener los paises vecinos
          })
        })
          //.catch(error => console.error(error))//imprimir el error en consola
      });
    }
  getCountry();  //llamar a la funcion para obtener los paise
  function getNeigCountries(countryCode) {//funcion para obtener los paises vecinos
          const key = '0A3DLPAF3EHRMN3JSU6ZWTARNDBEBRGG'//key de la API
          //const neighborUrl = `https://api.geodatasource.com/neighbouring-countries?key=${key}&country_code=${countryCode}`//url de la API
        fetch(`https://api.geodatasource.com/neighbouring-countries?key=${key}&country_code=${countryCode}`)
            .then(response => response.json())//convertir la respuesta a json
            .then(infoPaises => {//recorrer el json
              console.log(infoPaises)//imprimir en consola
              const map = L.map('mapid');
              const lat = infoPaises[0].latitude;
              const lng = infoPaises[0].longitude;
              map.setView([lat, lng], 13);
              const neighboringCountriesList = document.createElement('div')//crear un elemento div
              neighboringCountriesList.classList.add('neighboring-countries')//agregar la clase neighboring-countries
              neighboringCountriesList.textContent = 'Neighboring Countries'//agregar el texto
              const neighborCountries = document.createElement('ul')//crear un elemento ul
              infoPaises.forEach(pais => {//recorrer el json
                const neighborList = document.createElement('li')//crear un elemento li
                neighborList.textContent = pais.country_name//agregar el nombre del pais vecino
                neighborCountries.appendChild(neighborList)//agregar el li al ul
              const selectedCountry = document.querySelector('.selected'); //seleccionar el pais
                if (selectedCountry) {//si el pais esta seleccionado
                  selectedCountry.classList.remove('selected');//remover la clase selected
              }
                countryList.classList.add('selected');//agregar la clase selected
                countryList.appendChild(neighboringCountriesList);//agregar el ul al li
              })
            });
        }
