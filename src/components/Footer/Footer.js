import "./Footer.scss";
import facebookIcon from "../../assets/icons/Icon-facebook.svg"
import instagramIcon from "../../assets/icons/Icon-instagram.svg"
import twitterIcon from "../../assets/icons/Icon-twitter.svg"
import googleIcon from "../../assets/icons/google-play-badge.png";
import appleIcon from "../../assets/icons/Apple_store_badge.svg"

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__details">
                <div className="footer__contact">
                    <h3 className="footer__title">Contact Us</h3>
                    <p className="footer__text">info@docturn.com</p>
                    <p className="footer__text">416.555.5555</p>
                </div>
                <div className="footer__social-media">
                    <h3 className="footer__title">Follow DocTurn</h3>
                    <div className="footer__social-icons">
                        <a 
                            href="https://www.facebook.com"
                            target="_blank"
                            ><img 
                                src={facebookIcon} 
                                alt="Facebook icon"
                                className="footer__social-icon"
                            ></img>
                        </a>
                        <a 
                            href="https://www.instagram.com"
                            target="_blank"
                            ><img 
                                src={instagramIcon} 
                                alt="Instagram icon"
                                className="footer__social-icon"
                            ></img>
                        </a>
                        <a 
                            href="https://www.twitter.com"
                            target="_blank"
                            ><img 
                                src={twitterIcon} 
                                alt="Twitter icon"
                                className="footer__social-icon"
                            ></img>
                        </a>
                    </div>
                </div>
                <div className="footer__app">
                    <h3 className="footer__download-title">Download the app</h3>
                    <div className="footer__download">
                        <img 
                            src={googleIcon} 
                            alt="Download on Google Play icon"
                            className="footer__icon"
                        ></img>
                        <img 
                            src={appleIcon} 
                            alt="Download on Google Play icon"
                            className="footer__icon--apple"
                        ></img>
                    </div>
                </div>
            </div>
            <p className="footer__copyright">© 2022 DocTurn Inc.</p>
        </footer>
    )
}

export default Footer;