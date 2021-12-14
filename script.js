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




var todaysDate = new Date()
var pickedDate = new Date();
//sets default date



var btcTodaysPrice = '';
var btcPickedPrice = '';


function dateConversion(date) {
  todaysDate = new Date().toLocaleDateString('en-GB').split('/').join('-');
  pickedDate = new Date(date).toLocaleDateString('en-GB').split('/').join('-');
}

function updateDom(btcPickedPrice, btcTodaysPrice) {

  todayDate.innerHTML = todaysDate;
  pickDate.innerHTML = pickedDate;

  var todayBtcValue = (((1 / btcPickedPrice) * 100) * btcTodaysPrice).toFixed(2);
  //default 100 eur value for picked day
  var pickBtcValue = '100.00';

  todayBtc.innerHTML = btcTodaysPrice.toFixed(2);
  pickBtc.innerHTML = btcPickedPrice.toFixed(2);
  todayEur.innerHTML = todayBtcValue;
  pickEur.innerHTML = pickBtcValue;
}

dateBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  console.log(dateInput.value)
  dateConversion(dateInput.value);
  //check if empty
  if (!dateInput.value) {
    alert('Please input date!');
  }
  //check if not in the future
  else if (new Date(dateInput.value).getTime() > new Date().getTime()) {
    alert('I wish I knew the future price of BTC!');
  }
  else {
    try {
      btcPickedPrice = await fetchBtc(pickedDate);
      btcTodaysPrice = await fetchBtc(todaysDate);
      updateDom(btcPickedPrice, btcTodaysPrice);
    } catch {
      console.log('Error fetchBtc().click unsuccessful')
    }
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





