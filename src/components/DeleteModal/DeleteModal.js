import "./DeleteModal.scss"
import cancelIcon from "../../assets/icons/close-24px.svg"
import { getFirestore, deleteDoc, doc } from "firebase/firestore";

function DeleteModal({onClick, id}) {

    const handleClick = (event) => {
        const db = getFirestore()
        const docRef = doc(db, "documents", id)
        deleteDoc(docRef)
            .then(() => {
                onClick()
            })
    }

    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const toggleModal = () => {
    //     setIsModalOpen(!isModalOpen);
    //   }

    return (
        <div className="modal">
            <section className="modal__container">
                <img src={cancelIcon} className="modal__cancel-action" onClick={() => onClick()}></img>
                <h1 className="modal__text">Are you sure you want to delete?</h1>
                <button className="modal__button" onClick={() => handleClick()}>Delete</button>
            </section>
        </div>
    )
}

export default DeleteModal