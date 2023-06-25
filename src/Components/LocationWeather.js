import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../App.css'


const LocationWeather = () => {

    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch weather data based on current location
        navigator.geolocation.getCurrentPosition(
            async position => {
                const { latitude, longitude } = position.coords;

                try {

                    const url = `${process.env.REACT_APP_API_URL}/current.json?key=${process.env.REACT_APP_API_KEY}&q=${latitude},${longitude}`;

                    const response = await axios.get(url);
                    setWeatherData(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                    setLoading(false);
                }
            },
            error => {
                console.error('Error getting location:', error);
                setLoading(false);
            }
        );
    }, []);

    console.log(weatherData);
    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : weatherData ? (
                <div className="app-wrap">
                    <main>
                        <section className="location">
                            <div className="city">{weatherData.location.name}</div>
                            <div className="date">{weatherData.location.localtime}</div>
                        </section>
                        <div className="current">
                            <div className="hi-low">Humidity : {weatherData.current.humidity}</div>
                            <div className="temp">{weatherData.current.temp_c}<span>°c</span></div>
                            <div className="weather">{weatherData.current.condition.text}</div>
                            <img src={weatherData.current.condition.icon} alt="Weather Icon" className="w-20 h-20" />

                        </div>

                        {/* upcoming data  */}

                        <div className="flex flex-col items-center space-y-4 text-white">
                            {weatherData.forecast && weatherData.forecast.forecastday && weatherData.forecast.forecastday.length > 0 ? (
                                <div className="grid grid-cols-5 gap-4">
                                    {weatherData.forecast.forecastday.map((forecast, index) => (
                                        <div key={index} className="flex flex-col items-center">
                                            <p className="text-xl font-bold">{forecast.date}</p>
                                            <img
                                                src={forecast.day.condition.icon}
                                                alt="Weather Icon"
                                                className="w-16 h-16"
                                            />
                                            <p className="text-lg">{forecast.day.avgtemp_c}°C</p>
                                            <p>{forecast.day.condition.text}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-lg">No forecast data available.</p>
                            )}
                        </div>
                    </main>
                </div>
            ) : (
                <p>Failed to fetch weather data.</p>
            )}


        </div>
    );
};

export default LocationWeather;