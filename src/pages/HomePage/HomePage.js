import HomeHero from "../../components/HomeHero/HomeHero";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./HomePage.scss";

function HomePage() {

    return (
        <main className="home">
            <HomeHero/>
            <LoginForm/>
        </main>
    )
}

export default HomePage;