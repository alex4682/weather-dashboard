import { useState, useEffect } from 'react';
import { SearchItem } from './SearchItem';
import { SeeMore } from './SeeMore';
import { Hourly } from './Hourly';
import { Weekly } from './Weekly';
import './Search.scss';

export const SearchList = ({ searchQuery, isLoggined }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [seeMoreDay, setSeeMoreDay] = useState(null);
    const [hourlyDay, setHourlyDay] = useState(null);
    const [hourlyIsActive, setHourlyIsActive] = useState(false);
    const [weaklyIsActive, setWeeklyIsActive] = useState(false);
    const apikey = "425a7152fd4aec5354729bd963878955";

    const getCountryName = (code) => {
        if (!code) return '';
        try {
            const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
            return regionNames.of(code);
        } catch {
            return code;
        }
    };

    useEffect(() => {
        let active = true;
        setLoading(true);

        const queryFromProp = searchQuery && String(searchQuery).trim();
        const fallback = (() => {
            try { return localStorage.getItem('lastSearch'); } catch { return null; }
        })();
        const query = queryFromProp || fallback || 'Prague';
        const api = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${apikey}`;
        fetch(api)
            .then(response => {
                if (!response.ok) throw new Error(`API error ${response.status}`);
                return response.json();
            })
            .then(data => {
                if (!active) return;
                setData(data);
                setError(null);
            })
            .catch(error => {
                if (!active) return;
                setError(error.message);
                setData(null);
            })
            .finally(() => { if (active) setLoading(false); });

        return () => { active = false; };
    }, [searchQuery, apikey]);

    if (loading) return <ul className="search-list container"><li>Loading...</li></ul>;
    if (error) return <ul className="search-list container"><li>Error: {error}</li></ul>;
    if (!data || !data.list) return <ul className="search-list container"><li>No data</li></ul>;

    const getCountryCode = () => data.city?.country || '';

    const getDateOffset = (offsetDays) => {
        const d = new Date();
        d.setDate(d.getDate() + offsetDays);
        return d;
    };

    const getTime = (dateObj) =>
        dateObj.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });

    const getDate = (dateObj) =>
        dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });

    const getForecastForDay = (dayOffset) => {
        const targetDate = getDateOffset(dayOffset);
        const targetDay = targetDate.getDate();
        const targetMonth = targetDate.getMonth();
        const targetYear = targetDate.getFullYear();

        const forecast = data.list.find(item => {
            const forecastDate = new Date(item.dt * 1000);
            return (
                forecastDate.getDate() === targetDay &&
                forecastDate.getMonth() === targetMonth &&
                forecastDate.getFullYear() === targetYear
            );
        });

        return forecast || data.list[0];
    };

    const day0 = getForecastForDay(0);
    const day1 = getForecastForDay(1);
    const day2 = getForecastForDay(2);

    const getForecastData = (dayOffset) => {
        const item = getForecastForDay(dayOffset);
        return {
            feelsLike: item.main.feels_like.toFixed(0),
            minTemp: item.main.temp_min.toFixed(0) - 5,
            maxTemp: parseInt(item.main.temp_max.toFixed(0)) + 5,
            humidity: item.main.humidity,
            pressure: item.main.pressure,
            windSpeed: item.wind.speed,
            visibility: item.visibility / 1000
        };
    };

    const renderSearchItem = (forecast, dayOffset) => {
        const dateObj = getDateOffset(dayOffset);
        return (
            <SearchItem
                setWeeklyIsActive={setWeeklyIsActive}
                setHourlyDay={setHourlyDay}
                setHourlyIsActive={setHourlyIsActive}
                setSeeMoreDay={setSeeMoreDay}
                isActive={isActive}
                setIsActive={setIsActive}
                isLoggined={isLoggined}
                key={dayOffset}
                city={data.city?.name}
                country={getCountryName(getCountryCode())}
                time={getTime(dateObj).split(':')[0]}
                date={getDate(dateObj).split(',')[1]}
                weekDay={getDate(dateObj).split(',')[0]}
                temp={forecast.main?.temp?.toFixed(0)}
                icon={forecast.weather?.[0]?.icon}
                description={forecast.weather?.[0]?.main}
                day={dayOffset}
            />
        );
    };
    const renderSeeMore = (dayOffset) => {
        if (dayOffset === null) return null;

        const info = getForecastData(dayOffset);

        return (
            <SeeMore
                feelsLike={info.feelsLike}
                minTemp={info.minTemp}
                maxTemp={info.maxTemp}
                humidity={info.humidity}
                pressure={info.pressure}
                windSpeed={info.windSpeed}
                visibility={info.visibility}
            />
        );
    };
    const renderWeekly = (getDate) => {
        if (!weaklyIsActive) return null;
        return <Weekly
            weeklyData={getWeeklyData(getDate)}
        />;
    }
    const getHourlyData = (dayOffset) => {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        start.setDate(start.getDate() + dayOffset);

        const end = new Date(start);
        end.setDate(end.getDate() + 1);

        const filtered = data.list.filter(item => {
            const t = item.dt * 1000;
            return t >= start.getTime() && t < end.getTime();
        });

        const result = [];
        for (let h = 0; h < 24; h++) {
            const hourDate = new Date(start);
            hourDate.setHours(h);

            const forecast = filtered.find(item => {
                const t = new Date(item.dt * 1000);
                return t.getHours() === h;
            });

            result.push({
                time: hourDate.toLocaleTimeString("uk-UA", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                temp: forecast
                    ? Number(forecast.main.temp.toFixed(0))
                    : null
            });
        }

        return result;
    };
    const getWeeklyData = () => {
    const result = [];
    for (let d = 0; d < 8; d++) {
        const forecast = getForecastForDay(d);
        if (!forecast) continue;

        result.push({
            date: new Date(forecast.dt * 1000).toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" }),
            temp: forecast.main?.temp.toFixed(0),
            feels_like: forecast.main?.feels_like.toFixed(0),
            icon: forecast.weather?.[0]?.icon,
            weather: forecast.weather || []
        });
    }
    return result;
};





    const renderHourly = (dayOffset) => {
        if (dayOffset === null) return null;
        return <Hourly hourlyData={getHourlyData(dayOffset)} />;
    };



    return (
        <><ul className="search-list container">
            {renderSearchItem(day0, 0)}
            {renderSearchItem(day1, 1)}
            {renderSearchItem(day2, 2)}
        </ul>
            {isActive ?
                renderSeeMore(seeMoreDay) : null
            }
            {hourlyIsActive ?
                renderHourly(hourlyDay) : null

            }
            {weaklyIsActive ?
                renderWeekly(hourlyDay) 
                : null}
        </>
    );
};
