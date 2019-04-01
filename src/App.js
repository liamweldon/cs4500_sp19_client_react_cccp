import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Admin from './components/Admin';
import ProviderContainer from './containers/ProviderContainer';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1>ServicesRus</h1>
        <Router>
          <div>
            <Link to="/admin">Admin</Link> | <Link to="/provider">Provider</Link>
            <Route path="/admin" component={Admin} />
            <Route path="/provider" exact component={ProviderContainer} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
