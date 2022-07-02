import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import DocumentsPage from "./pages/DocumentsPage/DocumentsPage";
import PageNavigation from "./components/PageNavigation/PageNavigation";
import Footer from "./components/Footer/Footer";
import AddDocumentPage from "./pages/AddDocumentPage/AddDocumentPage";
import EditDocumentPage from "./components/EditDocumentForm/EditDocumentForm";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import { useState } from "react";
import SideBar from "./components/SideBar/SideBar";


function App() {
  const [menuOpen,setMenuOpen] = useState(false)

    return (
      <AuthProvider>
        <BrowserRouter>
          <PageNavigation menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
          <SideBar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/documents" exact component={DocumentsPage} />
            <Route path="/documents/add" component={AddDocumentPage} />
            <Route path="/document/:id/edit" component={EditDocumentPage} />
            {/* <AuthRoute authenticated={this.state.authenticated} path="/documents" render={props => <DocumentsPage {...props}/>}/> */}
          </Switch>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    );
  }

export default App;
