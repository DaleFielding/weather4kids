// const fetch = require('node-fetch'); // commented out as this stops it working in browser console.

const baseUrl = "http://api.weatherapi.com/v1";
const apiKey = "211d38f5813f4f90bfa70515240501";
let locationName = "Bristol"; // fixed location temporarily, will be adding dynamic variables later on.

let url = `${baseUrl}/current.json?key=${apiKey}&q=${locationName}`;

/* Fetch the data, throw an error if there's an issue with the response,
   catch the error and display it in the console.
   Console log data if the fetch is successful.
*/
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });