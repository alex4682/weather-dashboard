import { useState } from 'react';
import { Header } from './components/header/Header';
import { Hero } from './components/hero/Hero';
import { SearchList } from './components/search/SearchList';
import { Pets } from './components/pets/Pets';
import { Nature } from './components/nature/Nature';
import { Footer } from './components/footer/Footer';
import './main.css';

function App() {
    const [searchResult, setSearchResult] = useState("Prague");

    return (
        <>
            <Header />
            <Hero searchResult={searchResult} setSearchResult={setSearchResult} />
            <SearchList searchQuery={searchResult} />
            <Pets />
            <Nature />
            <Footer />
        </>
    );
}

export default App;
