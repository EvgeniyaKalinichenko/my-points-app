



const submitBtn = document.querySelector('.submitBtn');
const cityName = document.querySelector('.card-name');
const cityCurrency = document.querySelector('.card-currency');
const cityTimezone = document.querySelector('.card-timezone');
// const formContainer = document.querySelector('.form_container');
// const countryInfoContainer = document.querySelector('.countryInfoContainer');

submitBtn.addEventListener('click', enteredCity);

export default function enteredCity() { 
    let autoCompleteInput = document.querySelector('#input');
    console.log('City input: ' + autoCompleteInput.value);
    getCountryData(autoCompleteInput.value);
    //printCityName(autoCompleteInput.value);
    document.querySelector('#input').value = '';
}

let countryNames = [];

function printCurrency(currency) { 
    //console.log('currency:');
    cityCurrency.textContent = 'Currency: '+currency;
}

function printCityName(city) { 
    //console.log('cityName:');
    cityName.textContent = city;
}
function printTimeZone(timezone) { 
    let timezoneStr = JSON.stringify(timezone);
    cityTimezone.textContent = 'Time zone: '+timezoneStr.substr(2,9);
}

function getLocalTime(localTimezone) { 
    let date = new Date().getTime();
    console.log('current time: '+date);
    //console.log(`Current date: ${date.getHours()}:${date.getMinutes()}`);
    let localTime = 0;
    let myTime = new Date();
    
    console.log(`myTime : ${myTime.getHours()}:${myTime.getMinutes()}`);
    let myTimeFormat = ` Local Time: ${myTime.getHours()}:${myTime.getMinutes()}`;
    cityTimezone.textContent += myTimeFormat;
    console.log('myTime offset timezone: '+myTime.getTimezoneOffset());
    let localTimezoneStr = JSON.stringify(localTimezone);
    console.log('localTimezone  '+localTimezoneStr + 'type of:  '+typeof(localTimezoneStr));
    let localTimezoneStrHours = localTimezoneStr.substr(5,3);
    console.log('timeZone HOURS:' + localTimezoneStrHours);
    let localTimezoneNumHours = +localTimezoneStrHours;

    if (-myTime.getTimezoneOffset() != (localTimezoneNumHours * 60)) {
        console.log('different utc');
    }
    else { console.log('same utc');}
    //console.log('timeZone HOURS Num:' + localTimezoneNumHours +'   type of:  '+typeof(localTimezoneNumHours));

    let localTimezoneStrMinutes = localTimezoneStr.substr(9, 2);
    //console.log('timeZone MIN:' + localTimezoneStrMinutes);
    


}
//getLocalTime();

async function getCountryData(capitalCity) {
    const countryResource = await fetch('https://restcountries.com/v3.1/capital/' + capitalCity);
    const data = await countryResource.json()
    console.log(data);
    //printCurrency(data.currencies[Object.keys(data[0].currencies)[0]].name);
    printCurrency((data[0].currencies[Object.keys(data[0].currencies)[0]].name) + ' (' + (data[0].currencies[Object.keys(data[0].currencies)[0]].symbol) + ')');
    printCityName(data[0].capital);
    printTimeZone(data[0].timezones);
    getLocalTime(data[0].timezones);

    countryNames = data.map((country) => {
        return country.name.common;
    })

 
}

