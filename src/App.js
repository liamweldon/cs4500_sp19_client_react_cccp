import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Admin from './components/Admin';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1>ServicesRus</h1>
        <Router>
          <div>
            <Link to="/admin">Admin</Link>
            <Route path="/admin" component={Admin} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
