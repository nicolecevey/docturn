import { Component } from "react";
import axios from "axios";
import WelcomeBanner from "../../components/WelcomeBanner/WelcomeBanner";
import DocumentsList from "../../components/DocumentsList/DocumentsList";

class DocumentsPage extends Component {
  state = {
    documents: [],
    hasErrorLoading: false,
  };

  componentDidMount() {
    const token = sessionStorage.authToken;

    // axios call to /posts, include the token, from sessionStorage.authToken
    axios
      .get("http://localhost:8080/documents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response)
        this.setState({
          documents: response.data,
        });
      })
      .catch(() => {
        this.setState({
          hasErrorLoading: true,
        });
        sessionStorage.removeItem("authToken");
      });
  }

  render() {
    if (this.state.hasErrorLoading) {
      return <h2>Error loading documents. Please refresh the page</h2>;
    }

    // Show something if posts aren't loaded yet
    // if (this.state.documents.length === 0) {
    //   return <h2>Loading documents...</h2>;
    // }

    return (
      <>
        <WelcomeBanner/>
        <DocumentsList documents={this.state.documents}/>
      </>
    );
  }
}

export default DocumentsPage;
