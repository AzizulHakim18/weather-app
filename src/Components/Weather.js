import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Weather.css'


const Weather = () => {


    const [location, setLocation] = useState('');
    const [searchData, setsearchData] = useState(null);

    const handleInputChange = (e) => {
        setLocation(e.target.value);
    };

    const getsearchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/current.json?key=${process.env.REACT_APP_API_KEY}&q=${location}`
            );
            setsearchData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    console.log(searchData);
    return (
        <div className="container">
            <h1>Search <span>Weather</span></h1>

            <div className="search-container">

                <input id="city-input" type="text" placeholder="Enter city" value={location} onChange={handleInputChange} />
                <button onClick={getsearchData} className="px-4 py-2 ml-2 font-bold text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"> Get Data</button>
            </div>

            {searchData && (

                <div className="flex flex-col items-center space-y-2">
                    <h2 className="text-3xl font-bold">{searchData.location.name}</h2>
                    <p className="text-4xl font-bold">{searchData.current.temp_c}°C</p>
                    <img
                        src={searchData.current.condition.icon}
                        alt="Weather Icon"
                        className="w-20 h-20"
                    />
                    <p className="text-lg">{searchData.current.condition.text}</p>
                </div>



            )}
        </div>
    );
};

export default Weather;