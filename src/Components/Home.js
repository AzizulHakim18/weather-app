
import '../App.css'
import LocationWeather from './LocationWeather'
import Weather from './Weather';
const Home = () => {




    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4'>
            <LocationWeather></LocationWeather>
            <Weather></Weather>
        </div>
    );
};

export default Home;