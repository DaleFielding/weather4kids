const fetch = require('node-fetch');

const baseUrl = "http://api.weatherapi.com/v1";
const apiKey = "211d38f5813f4f90bfa70515240501";
const location = "Bristol"; // temporary location for testing setup, will be changing to dynamic variable.

let url = `${baseUrl}/current.json?key=${apiKey}&q=${location}`;

/*Fetch the data, throw error if issue with the response, catch error and display error in console. 
 Console log data if fetch successful.
 */
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);

  })
  .catch(error => {
    console.error('Error:', error);
  });