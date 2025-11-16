import { useState, useEffect } from 'react';
import { SearchItem } from './SearchItem';

export const SearchList = () => {
    const [data, setData] = useState(null);

    const apikey = "425a7152fd4aec5354729bd963878955"
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=50.073658&lon=14.418540&appid=${apikey}`

    useEffect(() => {
        fetch(api)
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log(data);
            })
            .catch(error => console.error('Error:', error));
    }, [api]);

    const getTime = () => new Date().toLocaleTimeString('uk-UA', { hour: '2-digit' });
    const getDate = () => new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });

    return (
        <ul className="search-list">
            {data && (
                <>
                    <SearchItem
                        city={data.name}
                        country={data.sys.country}
                        time={getTime()}
                        date={getDate().split(',')[1]}
                        weekDay={getDate().split(',')[0]}
                        temp={(data.main.temp - 273).toFixed(1)}
                    />
                    <SearchItem
                        city={data.name}
                        country={data.sys.country}
                        time={getTime()}
                        date={getDate().split(',')[1]}
                        weekDay={getDate().split(',')[0]}
                        temp={(data.main.temp - 273).toFixed(1)}
                    />
                    <SearchItem
                        city={data.name}
                        country={data.sys.country}
                        time={getTime()}
                        date={getDate().split(',')[1]}
                        weekDay={getDate().split(',')[0]}
                        temp={(data.main.temp - 273).toFixed(1)}
                    />
                </>
            )}
        </ul>
    );
}