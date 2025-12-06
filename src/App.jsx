import { useState, useEffect } from 'react';
import { Header } from './components/header/Header';
import { Hero } from './components/hero/Hero';
import { SearchList } from './components/search/SearchList';
import { Pets } from './components/pets/Pets';
import { Nature } from './components/nature/Nature';
import { Footer } from './components/footer/Footer';
import './main.scss';

function App() {
    
    const [isLoggined, setIsLoggined] = useState(false);
    const [searchResult, setSearchResult] = useState(() => {
        try {
            return localStorage.getItem('lastSearch') ;
        } 
        catch{
            return null;
        }
    });

    useEffect(() => {
        try {
            if (searchResult) localStorage.setItem('lastSearch', searchResult);
        } catch {}
    }, [searchResult]);

    return (
        <>
            <Header isLoggined={isLoggined} setIsLoggined={setIsLoggined}/>
            <Hero searchResult={searchResult} setSearchResult={setSearchResult} />
            <SearchList searchQuery={searchResult} isLoggined={isLoggined}/>
            <Pets />
            <Nature />
            <Footer />
        </>
    );
}

export default App;
