import pets1 from "../../img/pets1.png";
import pets2 from "../../img/pets2.png";
import pets3 from "../../img/pets3.png";
import pets4 from "../../img/pets4.png";
import { useState, useEffect } from "react";
import './Pets.scss';

export const Pets = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apikey = "5b3ff3eb33494302bba0b2f1d0e69902";
    const api = `https://newsapi.org/v2/everything?q=pets&from=2025-10-22&sortBy=publishedAt&apiKey=${apikey}&page=1&pageSize=4&searchIn=title`;

    useEffect(() => {
        setLoading(true);
        fetch(api)
            .then(response => {
                if (!response.ok) throw new Error(`API error ${response.status}`);
                return response.json();
            })
            .then(data1 => {
                setData(data1);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error.message);
                setLoading(false);
            });
    }, [api]);

    if (loading) return <section className="pets"><p>Loading pets news...</p></section>;
    if (error) return <section className="pets"><p>Error: {error}</p></section>;
    if (!data?.articles || data.articles.length === 0) return <section className="pets"><p>No articles found</p></section>;

    return (
        <section className="pets container">
            <h2 className="pets-title">Interacting with our pets</h2>
            <ul className="pets-list">
                {data.articles.map((article, index) => (
                    <li key={index} className="pets-item">
                        {article.urlToImage && <img src={article.urlToImage} alt={article.title || 'Pet news'} />}
                        <h3>{article.title}</h3>
                    </li>
                ))}
            </ul>
            <button type="button" className="pets-btn">See more</button>
        </section>
    );
};