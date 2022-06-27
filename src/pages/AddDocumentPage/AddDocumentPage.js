import "./AddDocumentPage.scss";
import AddDocumentForm from "../../components/AddDocumentForm/AddDocumentForm";
import { Link } from "react-router-dom";

function AddDocumentPage() {
    return (
        <section className="add-document">
            <AddDocumentForm/>
        </section>
    )
}

export default AddDocumentPage;