//form
const dateInput = document.querySelector('.date__input')
const dateBtn = document.querySelector('.date__btn')

// table
const pickDate = document.querySelector('.pickDate');
const pickEur = document.querySelector('.pickEur');
const pickBtc = document.querySelector('.pickBtc');

const todayDate = document.querySelector('.todayDate');
const todayEur = document.querySelector('.todayEur');
const todayBtc = document.querySelector('.todayBtc');


var todaysDate = new Date().toLocaleDateString('en-GB').split('/').join('-');
var pickedDate = new Date();
//sets default date
dateInput.placeholder = todaysDate.split('-').join('/');


var btcTodaysPrice = '';
var btcPickedPrice = '';

function updateDom() {
  todayDate.innerHTML = todaysDate;
  pickDate.innerHTML = pickedDate;

  var todayBtcValue = ((1 / btcPickedPrice) * 100) * btcTodaysPrice;
  var pickBtcValue = 100;


  todayBtc.innerHTML = btcTodaysPrice.toFixed(2);
  pickBtc.innerHTML = btcPickedPrice.toFixed(2);


  todayEur.innerHTML = todayBtcValue.toFixed(2);
  pickEur.innerHTML = pickBtcValue.toFixed(2);
}

dateBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    btcPickedPrice = await fetchBtc(dateInput.value.split('/').join('-'));
    btcTodaysPrice = await fetchBtc(todaysDate);
    pickedDate = await new Date(dateInput.value).toLocaleDateString('en-GB').split('/').join('-');
    updateDom()
  } catch {
    console.log('Error fetchBtc().click unsuccessful')
  }

})

async function fetchBtc(date) {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/history?date=${date}`);
    const data = await response.json();
    return data.market_data.current_price.eur
  }
  catch {
    console.log('Error fetchBtc() unsuccessful')
  }
}





// .toFixed(2)