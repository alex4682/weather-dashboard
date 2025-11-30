import pressureImg from "../../img/pressure.svg";
import defs from "../../img/symbol-defs.svg";
import './Search.scss'
export const SeeMore = ({ feelsLike, minTemp, maxTemp, humidity, pressure, windSpeed, visibility }) => {
    let img = null
    let humidityIcon = null
    let visibilityIcon = null
    let color = null
    let humidityColor = null
    if (feelsLike >= 25) {
        img = `${defs}#icon-temp-25`;
        color = 'red';
    }
    else if (feelsLike >= 15) {
        img = `${defs}#icon-temp-15`;
        color = 'red';
    }
    else if (feelsLike >= 5) {
        img = `${defs}#icon-temp-5`;
        color = 'red';
    }
    else if (feelsLike >= -5) {
        img = `${defs}#icon-temp--5`;
        color = 'blue';

    }
    else {
        img = `${defs}#icon-temp--30`;
        color = 'blue';
    }
    if (humidity >= 50) {
        humidityIcon = `${defs}#icon-rain`;
        humidityColor = 'lightblue';
    }
    else {
        humidityIcon = `${defs}#icon-sun`;
        humidityColor = 'yellow';
    }
    if (visibility > 5) {
        visibilityIcon = `${defs}#icon-eye`;
    }
    else {
        visibilityIcon = `${defs}#icon-eye-blocked`;
    }
    if (minTemp == -0) {
        minTemp = 0
    }
    if (maxTemp == -0) {
        maxTemp = 0
    }
    if (feelsLike == -0) {
        feelsLike = 0
    }

    return (
        <ul className="see-more-list container">
            <li>
                <p>Feels like</p>
                <span>{feelsLike}°C</span>
                <svg>
                    <use href={img} className={color}></use>
                </svg>
            </li>
            <li>
                <p>Min °C</p>
                <span>{minTemp}°C</span>
                <p>Max °C</p>
                <span>{maxTemp}°C</span>
            </li>
            <li>
                <p>Humidity</p>
                <span>{humidity}%</span>
                <svg>
                    <use href={humidityIcon} className={humidityColor}></use>
                </svg>
            </li>
            <li>
                <p>Pressure</p>
                <span>{pressure} Pa</span>
                <svg>
                    <use href={pressureImg} ></use>
                </svg>
            </li>
            <li>
                <p>Wind speed</p>
                <span>{windSpeed} m/s</span>
                <svg>
                    <use href={`${defs}#icon-wind`} className="lightblue"></use>
                </svg>
            </li>
            <li>
                <p>Visibility</p>
                <span>{visibility} km</span>
                <svg>
                    <use href={visibilityIcon}></use>
                </svg>
            </li>
        </ul>
    )
}