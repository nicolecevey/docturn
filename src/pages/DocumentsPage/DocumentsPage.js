import WelcomeBanner from "../../components/WelcomeBanner/WelcomeBanner";
import DocumentsList from "../../components/DocumentsList/DocumentsList";

function DocumentsPage() {

  window.scrollTo(0,0)

    return (
      <>
        <WelcomeBanner/>
        <DocumentsList/>
      </>
    );
  }
// }

export default DocumentsPage;
