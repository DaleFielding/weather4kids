const baseUrl = "http://api.weatherapi.com/v1";
const apiKey = "211d38f5813f4f90bfa70515240501";
const location = "Bristol"; // Replace with the desired location

let url = `${baseUrl}/current.json?key=${apiKey}&q=${location}`;

console.log(url)