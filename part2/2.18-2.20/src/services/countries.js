import axios from "axios"
const url = 'https://restcountries.com/v3.1/all'


const getData = async () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const getWeatherData = async (query) => {
    if (!query) {
        return;
    } else {
        const weatherURL = `http://api.weatherapi.com/v1/forecast.json?key=8da9dc3302d94e8b915162620242904&q=${query}&days=1&aqi=no&alerts=no`
        const response = await axios.get(weatherURL)
        return response.data
    }
    
    
}


export default { getData, getWeatherData }