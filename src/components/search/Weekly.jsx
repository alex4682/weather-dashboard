import "./Search.scss";
export const Weekly = ({ weeklyData }) => {
    return (
        <div className="weekly-forecast container">
            <h2>8 day forecast</h2>
            <div className="weekly-cards">
                {weeklyData?.map((day, index) => (
                    <div key={index} className="weekly-card">
                        <h3>{day.date}</h3>
                        <div className="icon-temp-wrap">
                            <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt="" />
                            <p>{day.temp}°C/{day.feels_like}°C</p>
                            </div>
                        <p>{day.weather[0].description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
