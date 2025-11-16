import delete1 from "../../img/delete.png";
import heart from "../../img/heart.png";
import refresh from "../../img/refresh.png";
import sunny from "../../img/sunny.png";


export const SearchItem = ({city, country, time, date, weekDay, temp}) => {
    return (
        <li className="search-item">
            <div>
                <p>{city}</p>
                <p>{country}</p>
            </div>
            <h2>{time}:00</h2>
            <div>
                <button>hourly forecast</button>
                <button>weakly forecast</button>
            </div>
            <div>
                <p>{date}</p>
                <p>{weekDay}</p>
            </div>
            <img src={sunny} alt="" />
            <p>{temp}℃</p>
            <div>
                <button><img src={refresh} alt="" /></button>
                <button><img src={heart} alt="" /></button>
                <button>See More</button>
                <button><img src={delete1} alt="" /></button>
            </div>
        </li>
    )
}