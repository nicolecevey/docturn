import "./DocumentCard.scss";
import documentIcon from "../../assets/document-128.png";

function DocumentCard({id, title, status, toReview, reviewerName, lastReviewed, version}) {

    function timestampToDate(timestamp) {
        let date = new Date(timestamp);
        return date.toLocaleDateString("en-US", {
            month: "2-digit", 
            day: "2-digit", 
            year: "numeric"  
        })
    }

    return (
        <article 
            className="document-card"
            key={id}
        >
            <img 
                src={documentIcon}
                className="document-card__icon"
                alt="Document icon"
            ></img>
            <div className="document-card__details">
                <h3>{title}</h3>
                <p>Status: {status.data  === 1 ? "Open" :"Closed"}</p>
                <p>Version: {version}.0</p>
                <p>To review: {toReview.data === 1 ? "Yes" :"No"}</p>
                <p>{reviewerName}</p>
                <p>{timestampToDate(lastReviewed)}</p>
            </div>
        </article>
    )
}

export default DocumentCard;