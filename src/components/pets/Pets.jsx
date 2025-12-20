import { useState, useEffect } from "react";
import './Pets.scss';

export const Pets = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apikey = "dcce3394636548d46ad216b8ea9db189";

    useEffect(() => {
        let active = true;
        setLoading(true);

        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 7);
        const from = fromDate.toISOString().split('T')[0];

        const params = new URLSearchParams({
            q: 'pet',
            sortBy: 'publishedAt',
            apikey: apikey,
            page: '1',
            max: '4',
            searchIn: 'title',
            lang: 'en',
            from: from,

        });

        const url = `https://gnews.io/api/v4/search?${params.toString()}`;

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
                        {article.image && <img src={article.image} alt={article.title || 'Pet news'} />}
                        <h3>{article.title}</h3>
                    </li>
                ))}
            </ul>
            <a href="https://newsapi.org/"> <button type="button" className="pets-btn" >See more</button></a>
        </section>
    );
};