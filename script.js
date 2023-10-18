const btn = document.querySelector('.btn-country')
const countryContainer = document.querySelector('.countries')

const displayCountry = function(data, className = '') {
    const currencies = data.currencies 
    const currencieSimbol = Object.values(currencies)[0].symbol
    const currencieName = Object.values(currencies)[0].name
    const languages = data.languages
    const firstLangugaes = Object.values(languages)[0]
    const html = `
    <article class="country ${className}">
                <img src="${data.flags.png}" alt="" class="country__img">
                <div class="country__container">
                    <div class="country__data">
                        <h3 class="country__name">${data.name.common}</h3>
                        <h4 class="country__region">${data.region}</h4>
                        <p class="country__row"><span>&#128104;&#8205;&#128104;&#8205;&#128103;&#8205;&#128103;</span>${(+data.population / 1000000).toFixed(1)} mil</p>
                        <p class="country__row"><span>&#128483;</span>${firstLangugaes}</p>
                        <p class="country__row"><span>&#128176</span>${currencieSimbol} ${currencieName}</p>
                    </div>
                    <div class="country__coat">
                        <img  class="country__coat-img" src="${data.coatOfArms.png}">
                    </div>
                </div>
            </article>
    `
    countryContainer.insertAdjacentHTML('beforeEnd', html)
    countryContainer.style.opacity='1'
}

// const getCountryAddBorderCoutntries = function(countryName) {
//     const request1 = new XMLHttpRequest()
//     request1.open('GET', `https://restcountries.com/v3.1/name/${countryName}`)
//     request1.send()
//     request1.addEventListener('load', function(){
//         const [data1] = JSON.parse(this.responseText)
//         displayCountry(data1)
//         const [firstNeighbour] = data1.borders
//         if (!firstNeighbour) return
//         const request2 = new XMLHttpRequest()
//         request2.open('GET', `https://restcountries.com/v3.1/alpha/${firstNeighbour}`)
//         request2.send()
//         request2.addEventListener('load', function(){
//             const [data2] = JSON.parse(this.responseText)
//             displayCountry(data2, 'neighbour')
//             console.log(data2);
//         })
//         console.log(firstNeighbour);
//     })
// }
const displayError = function(message) {
    countryContainer.insertAdjacentText('beforeend', message)
    countryContainer.style.opacity= 1
}
const getCountryData = function(countryName){
 fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => {
        console.log(response);
        if(!response.ok)
            throw new Error(`Учите географию! Страна не найдена! Статус: ${response.status}`)
        return response.json()
    })
    .then(data => {
        displayCountry(data[0])
        const firstNeighbour = data[0].borders[0]
        if(!firstNeighbour) return
        return fetch(`https://restcountries.com/v3.1/alpha/${firstNeighbour}`)
            
    })
    .then(response => response.json())
    .then(data => displayCountry(data[0], className='neighbour')) 
    .catch(e => {
        console.error(`${e + '😥'}`)
        displayError(`штота пошло не так 😥: ${e.message} 🤙`)
    })
    .finally(()=>{
        console.log('Отработало!');
    })
}
btn.addEventListener('click', function(){
    getCountryData('russian')
    // getCountryData('israel')
})
const displayCountryByGPS = function(lat, lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response =>{
        if(!response.ok)
        throw new Error(`Проблема. Статус: ${response.status}`)
        return response.json()
    })
    .then(data =>{
        console.log(data);
    })
    .catch(e => console.error(`${e.message} Неизвестная проблема😥`))
}
// displayCountryByGPS(48.857, 2.358)


