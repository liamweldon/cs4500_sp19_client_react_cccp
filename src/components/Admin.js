import React from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Services from './Services'

const Admin = () =>
<div>
    <h2>Admin</h2>
    <Router>
        <div className="row">
            <div className="col-3">
                <br/>
                <Link to="/admin/services">Services</Link>
            </div>
            <div className="col-9">
                <Route
                    path="/admin/services"
                    exact
                    component={Services}/>
            </div>
        </div>
    </Router>
</div>

export default Admin
