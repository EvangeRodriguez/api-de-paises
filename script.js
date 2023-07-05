const countryList = document.getElementById('country-list'); //traemos el countryList del html 

function getCountry() {
  fetch('https://restcountries.com/v3.1/all') //nos conectamos con la API que vamos a utilizar
    .then(response => response.json()) //convierte la respuesta de la API a JSON
    .then(data => {
      data.forEach(pais => { //recorremos el JSON
        const list = document.createElement('li'); //crear un elemento HTML li
        list.textContent = pais.name.common; //vinculamos el nombre del país con el elemento li

        const flagImg = document.createElement('img'); //crear un elemento HTML img
        flagImg.src = pais.flags.png; //vinculamos la bandera del país con la imagen

        list.appendChild(flagImg); //agregar la imagen al li
        countryList.appendChild(list); //agregar el li al ul
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

getCountry(); //llamar a la función
