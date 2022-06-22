import "./HomeHero.scss";
import documentIcon from "../../assets/document-512.png";

function HomeHero() {
    return (
        <main className="hero">
            <img 
                src={documentIcon}
                className="hero__icon"
            ></img>
            <p>Description</p>
        </main>
    )
}

export default HomeHero;