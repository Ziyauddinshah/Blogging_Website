import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import {Navbar} from 'bootstrap';
import HomePage from './components/homepage';
import NavbarPage from './components/navbarpage';
import LoginPage from './components/loginpage';
import RegisterPage from './components/registerpage';


// "react-bootstrap": "^1.6.1",

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarPage />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/loginpage" component={LoginPage}/>
          <Route exact path="/registerpage" component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;