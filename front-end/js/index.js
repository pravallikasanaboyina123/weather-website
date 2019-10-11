
/********location search form *******/
const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const message1 = document.querySelector('#msg-1')
const message2 = document.querySelector('#msg-2')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const locationName = searchInput.value;
    message1.textContent = 'loading....';
    message2.textContent = '';
    fetch('/weather?address=' + locationName).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error;
            } else {
                message1.textContent = 'Location: ' + data.location;
                message2.textContent = 'Forecast: ' + data.forecast;

            }
        })
    })
})