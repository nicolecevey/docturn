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
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";


function App() {
  const [menuOpen,setMenuOpen] = useState(false)

    return (
      <BrowserRouter>
        <AuthProvider>
          <PageNavigation menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
          <SideBar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <PrivateRoute path="/documents" exact component={DocumentsPage} />
            <PrivateRoute path="/documents/add" component={AddDocumentPage} />
            <PrivateRoute path="/document/:id/edit" component={EditDocumentPage} />
            {/* <AuthRoute authenticated={this.state.authenticated} path="/documents" render={props => <DocumentsPage {...props}/>}/> */}
          </Switch>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    );
  }

export default App;
