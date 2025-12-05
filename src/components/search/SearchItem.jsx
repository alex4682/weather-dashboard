import symbolDefs from "../../img/symbol-defs.svg";
import './Search.scss';

export const SearchItem = ({ setWeeklyIsActive, setHourlyDay, setHourlyIsActive, setSeeMoreDay, isActive, setIsActive, isLoggined, city = '', day, country = '', time = '', date = '', weekDay = '', temp = null, icon = null, description = '' }) => {
    const displayTemp = temp == -0 ? '0' : (temp === null || temp === undefined || Number.isNaN(Number(temp))) ? '—' : temp;
    const iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const iconAlt = description ? `${description} for ${city}` : `Weather icon for ${city}`;

    return (
        <li className="search-item">
            <div className="city-wrap">
                <p>{city}</p>
                <p>{country}</p>
            </div>
            <h2>{time}:00</h2>
            {!isLoggined ? null :
                <div className="forecast-wrap">
                    <button
                        type="button"
                        aria-label="Show hourly forecast"
                        onClick={() => {
                            setHourlyIsActive(true);
                            setIsActive(false);
                            setHourlyDay(day);
                            setWeeklyIsActive(false);
                        }}
                    >
                        Hourly forecast
                    </button>

                    <button type="button" aria-label="Show weekly forecast" onClick={()=>{
                        setWeeklyIsActive(true);
                        setIsActive(false);
                        setHourlyIsActive(false);
                    }}>Weekly forecast</button>
                </div>
            }
            <div className="date-wrap">
                <p>{date}</p>
                <p>{weekDay}</p>
            </div>
            <img src={iconSrc} alt={iconAlt} className="search-icon" />
            <p className="temp">{displayTemp}°C</p>
            <div className="item-btns">
                <button type="button" aria-label="Refresh">
                    <svg className="icon icon-refresh" width="24" height="24" viewBox="0 0 24 24">
                        <use href={`${symbolDefs}#icon-refresh`}></use>
                    </svg>
                </button>
                <button type="button" aria-label="Add to favorites">
                    <svg className="icon icon-heart-2" width="24" height="24" viewBox="0 0 37 32">
                        <use href={`${symbolDefs}#icon-heart-2`} className="heart"></use>
                    </svg>
                </button>
                <button type="button" aria-label="See more details" onClick={() => {
                    setIsActive(true)
                    setSeeMoreDay(day);
                    setHourlyIsActive(false);
                    setWeeklyIsActive(false);
                }}>See More</button>
                <button type="button" aria-label="Delete">
                    <svg className="icon icon-trash-2" width="24" height="24" viewBox="0 0 24 24">
                        <use href={`${symbolDefs}#icon-trash-2`}></use>
                    </svg>
                </button>
            </div>
        </li>
    );
};