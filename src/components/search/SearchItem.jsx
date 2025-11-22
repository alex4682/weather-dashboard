import delete1 from "../../img/delete.png";
import heart from "../../img/heart.png";
import refresh from "../../img/refresh.png";
import sunny from "../../img/sunny.png";
import './Search.scss';

export const SearchItem = ({ city = '', country = '', time = '', date = '', weekDay = '', temp = null, icon = null, description = '' }) => {
    const displayTemp = temp == -0? '0' : (temp === null || temp === undefined || Number.isNaN(Number(temp))) ? '—' : temp;
    const iconSrc = ` https://openweathermap.org/img/wn/${icon}@2x.png`;
    const iconAlt = description ? `${description} for ${city}` : `Weather icon for ${city}`;

    return (
        <li className="search-item">
            <div className="city-wrap">
                <p>{city}</p>
                <p>{country}</p>
            </div>
            <h2>{time}:00</h2>
            <div className="forecast-wrap">
                <button type="button" aria-label="Show hourly forecast">Hourly forecast</button>
                <button type="button" aria-label="Show weekly forecast">Weekly forecast</button>
            </div>
            <div className="date-wrap">
                <p>{date}</p>
                <p>{weekDay}</p>
            </div>
            <img src={iconSrc} alt={iconAlt} className="search-icon"/>
            <p className="temp">{displayTemp}°C</p>
            <div className="item-btns">
                <button type="button" aria-label="Refresh"><img src={refresh} alt="Refresh" /></button>
                <button type="button" aria-label="Add to favorites"><img src={heart} alt="Add to favorites" /></button>
                <button type="button" aria-label="See more details">See More</button>
                <button type="button" aria-label="Delete"><img src={delete1} alt="Delete" /></button>
            </div>
        </li>
    );
};