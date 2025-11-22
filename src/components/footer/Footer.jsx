import logo from '../../img/logo.png';
import inst from '../../img/inst.png';
import fb from '../../img/fb.png';
import ws from '../../img/ws.png';
import './Footer.scss';
export const Footer = () => {
    return (
        <footer>
            <div className="container footer-wrap">
                <img src={logo} alt="" />
                <div className='addres-wrap'>
                    <p>Address</p>
                    <p>Svobody str. 35
                        Kyiv
                        Ukraine</p>
                </div>
                <div className='contact-wrap'>
                    <p className='contact-name'>Contact us</p>
                    <ul className='contact-list'>
                        <li className='contact-item'><a href="#"><img src={inst} alt="" /></a></li>
                        <li className='contact-item'><a href="#"><img src={fb} alt="" /></a></li>
                        <li className='contact-item'><a href="#"><img src={ws} alt="" /></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}