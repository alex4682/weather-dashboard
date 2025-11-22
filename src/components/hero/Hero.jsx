import search from '../../img/search.png';
import './Hero.scss';
import { useState } from 'react';

export const Hero = ({ searchResult, setSearchResult }) => {
    const month = new Date().toLocaleString('en-US', { month: 'long' });
    const day = new Date().toLocaleString('en-US', { weekday: 'long' });
    const date = new Date().getDate();
    const year = new Date().getFullYear();

    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            setSearchResult(searchQuery);
        }
    };

    return (
        <section className="hero">
            <div className='container hero-wrap'>
                <h1 className='hero-title'>Weather dashboard</h1>
                <div className='hero-text-wrap'>
                    <p className='hero-text'>
                        Create your personal list of favorite cities and always be aware of the weather.
                    </p>
                    <p className='hero-text'>{month} {year} <br /> {day}, {date}</p>
                </div>

                <form className='hero-form' onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        placeholder="Search city..."
                        className='hero-search'
                        value={searchQuery}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className='hero-search-btn'>
                        <img src={search} alt="Search" />
                    </button>
                </form>
            </div>
        </section>
    );
};
