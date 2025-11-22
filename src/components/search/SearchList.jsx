import { useState, useEffect } from 'react';
import { SearchItem } from './SearchItem';
import './Search.scss';

export const SearchList = ({ searchQuery = "Prague" }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apikey = "425a7152fd4aec5354729bd963878955";
    const api = `https://api.openweathermap.org/data/2.5/forecast?q=${searchQuery}&units=metric&appid=${apikey}`;

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
        setLoading(true);

        fetch(api)
            .then(response => {
                if (!response.ok) throw new Error(`API error ${response.status}`);
                return response.json();
            })
            .then(data => {
                setData(data);
                setError(null);
            })
            .catch(error => {
                setError(error.message);
                setData(null);
            })
            .finally(() => setLoading(false));
    }, [api]);

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

    const renderSearchItem = (forecast, dayOffset) => {
        const dateObj = getDateOffset(dayOffset);
        return (
            <SearchItem
                key={dayOffset}
                city={data.city?.name}
                country={getCountryName(getCountryCode())}
                time={getTime(dateObj).split(':')[0]}
                date={getDate(dateObj).split(',')[1]}
                weekDay={getDate(dateObj).split(',')[0]}
                temp={forecast.main?.temp?.toFixed(0)}
                icon={forecast.weather?.[0]?.icon}
                description={forecast.weather?.[0]?.main}
            />
        );
    };

    return (
        <ul className="search-list container">
            {renderSearchItem(day0, 0)}
            {renderSearchItem(day1, 1)}
            {renderSearchItem(day2, 2)}
        </ul>
    );
};
