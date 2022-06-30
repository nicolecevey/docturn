import "./HomeHero.scss";
import documentIcon from "../../assets/document-512-white.png";

function HomeHero() {
    return (
        <main className="hero">
            <div className="hero__row">
                <img 
                    src={documentIcon}
                    className="hero__icon"
                ></img>
                <p className="hero__desc"><span className="hero__desc--bold">DocTurn</span> is a version control management application for busy business professionals.</p>
            </div>
        </main>
    )
}

export default HomeHero;