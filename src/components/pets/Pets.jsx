import pets1 from "../../img/pets1.png";
import pets2 from "../../img/pets2.png";
import pets3 from "../../img/pets3.png";
import pets4 from "../../img/pets4.png";
export const Pets = ()=>{
    return(
        <section>
            <ul>
                <li><img src={pets1} alt="" /></li>
                <li><img src={pets2} alt="" /></li>
                <li><img src={pets3} alt="" /></li>
                <li><img src={pets4} alt="" /></li>
            </ul>
            <button>See more</button>
        </section>
    )
}