import "./HomeHero.scss";
import documentIcon from "../../assets/document-512.png";

function HomeHero() {
    return (
        <main className="hero">
            <img 
                src={documentIcon}
                className="hero__icon"
            ></img>
            <p className="hero__desc">DocTurn is a document version control management application for busy business professionals.</p>
        </main>
    )
}

export default HomeHero;