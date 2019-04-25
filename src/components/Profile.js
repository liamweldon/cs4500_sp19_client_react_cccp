import React from 'react'

function read_cookie(name) {
  var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
  result && (result = JSON.parse(result[1]));
  return result;
}

class Profile extends React.Component {


  constructor(props) {
    var username = read_cookie("name")
    super(props)
    this.state = {
        users: [],
        user: read_cookie("user")
    };
  }

  render() {
      return (
        <div className="container">
            <h1>Profile</h1>
            <br/>
            <div>
                <h4>Legal name</h4>
                <div className="row">
                    <div className="col-6">
                        <label for="first-name">First name</label>
                        <input id="first-name" className="form-control" value={this.state.user.firstName}/>
                    </div>
                    <div className="col-6">
                        <label for="last-name">Last name</label>
                        <input id="last-name" className="form-control" value={this.state.user.lastName}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <label for="username">Username</label>
                        <input id="username" className="form-control" value={this.state.user.username}/>
                    </div>
                    <div className="col-6">
                        <label for="email">Email</label>
                        <input id="email" className="form-control" value={this.state.user.businessEmail}/>
                    </div>
                </div>
                <br/>
                <h4>Business address</h4>
                <div className="row">
                    <div className="col-12">
                        <label for="street">Street</label>
                        <input id="street" className="form-control" value={this.state.user.businessEmail}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <label for="city">City</label>
                        <input id="city" className="form-control" value={this.state.user.businessCity}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <label for="state">State</label>
                        <input id="state" className="form-control" value={this.state.user.businessState}/>
                    </div>
                    <div className="col-6">
                        <label for="zip">Zip</label>
                        <input id="zip" className="form-control" value={this.state.user.businessZipcode}/>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="row">
                    <div className="col-12">
                        <a className="btn btn-success btn-block">
                            Update Account
                        </a>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        </div>
      );
    }
}

export default Profile
