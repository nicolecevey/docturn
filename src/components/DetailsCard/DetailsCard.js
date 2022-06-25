import "./DetailsCard.scss";

function DetailsCard() {
    return (
        <article className="details-card">
            <h3 className="details-card__title">Your document details</h3>
            <p className="details-card__text">Open:</p>
            <p className="details-card__text">To review:</p>
            <p className="details-card__text">Waiting for review:</p>

        </article>
    )
}

export default DetailsCard;