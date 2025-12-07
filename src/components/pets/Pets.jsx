import { useState, useEffect } from "react";
import './Pets.scss';

export const Pets = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apikey = "5b3ff3eb33494302bba0b2f1d0e69902";

    useEffect(() => {
        let active = true;
        setLoading(true);

        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 7);
        const from = fromDate.toISOString().split('T')[0];

        const params = new URLSearchParams({
            q: 'pet',
            sortBy: 'publishedAt',
            apiKey: apikey,
            page: '1',
            pageSize: '4',
            searchIn: 'title',
            lang: 'en',
            from: from,
        });

        const url = `https://newsapi.org/v2/everything?${params.toString()}`;

        (async () => {
            try {
                const res = await fetch(url);
                const text = await res.text();
                let json = null;
                try { json = JSON.parse(text); } catch { }

                if (!res.ok) {
                    let msg = `NewsAPI error ${res.status}`;
                    if (json?.message) msg += ` - ${json.message}`;
                    else if (text) msg += ` - ${text}`;
                    throw new Error(msg);
                }

                if (!active) return;
                setData(json);
                setError(null);
            } catch (err) {
                console.error('Error fetching news:', err);
                if (active) setError(err.message || 'Failed to fetch news');
                if (active) setData(null);
            } finally {
                if (active) setLoading(false);
            }
        })();

        return () => { active = false; };
    }, [apikey]);

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
            <a href="https://newsapi.org/"> <button type="button" className="pets-btn" >See more</button></a>
        </section>
    );
};