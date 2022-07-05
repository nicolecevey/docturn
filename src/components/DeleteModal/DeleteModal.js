import "./DeleteModal.scss"
import cancelIcon from "../../assets/icons/close-24px.svg"
import { getFirestore, deleteDoc, doc } from "firebase/firestore";

function DeleteModal({onClick, id}) {

    const handleClick = () => {
        const db = getFirestore()
        const docRef = doc(db, "documents", id)
        deleteDoc(docRef)
            .then(() => {
                onClick()
            })
    }

    return (
        <div className="modal">
            <section className="modal__container">
                <img 
                    src={cancelIcon} 
                    className="modal__cancel-action" 
                    onClick={() => onClick()}
                    alt="Cancel icon to go back to documents page"
                ></img>
                <h3 className="modal__text">Are you sure you want to delete?</h3>
                <button className="modal__button" onClick={() => handleClick()}>Yes</button>
            </section>
        </div>
    )
}

export default DeleteModal