import search from '../../img/search.png';
export const Hero = () => {
    return (
        <section className="hero">
            <h1>Weather dashboard</h1>
            <p>Create your personal list of favorite cities and always be aware of the weather.</p>
            <p>October 2023 Friday, 13th</p>
            <form action="">
                <input type="text" />
                <button type="submit"><img src={search} alt="search" /></button>
            </form>
        </section>
    )
}