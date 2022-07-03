import WelcomeBanner from "../../components/WelcomeBanner/WelcomeBanner";
import DocumentsList from "../../components/DocumentsList/DocumentsList";
import { db } from "../../firebase";

function DocumentsPage() {

  window.scrollTo(0,0)

  // state = {
  //   documents: [],
  //   hasErrorLoading: false,
  // };


  // render() {
  //   if (this.state.hasErrorLoading) {
  //     return <h2>Error loading documents. Please refresh the page</h2>;
  //   }

    // Show something if posts aren't loaded yet
    // if (this.state.documents.length === 0) {
    //   return <h2>Loading documents...</h2>;
    // }

    return (
      <>
        <WelcomeBanner/>
        <DocumentsList/>
      </>
    );
  }
// }

export default DocumentsPage;
