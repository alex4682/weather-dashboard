import logo from '../../img/footer-logo.png';
import inst from '../../img/inst.png';
import fb from '../../img/fb.png';
import ws from '../../img/ws.png';
export const Footer = () => {
    return (
        <footer>
            <div>
                <img src={logo} alt="" />
                <div>
                    <p>Address</p>
                    <p>Svobody str. 35
                        Kyiv
                        Ukraine</p>
                </div>
                <div>
                    <p>Contact us</p>
                    <ul>
                        <li><a href="#"><img src={inst} alt="" /></a></li>
                        <li><a href="#"><img src={fb} alt="" /></a></li>
                        <li><a href="#"><img src={ws} alt="" /></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}