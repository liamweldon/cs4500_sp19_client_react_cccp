import React from 'react'
import Users from "../../components/Users"
import UserService from "../../services/UserService"

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.userService = UserService.getInstance()
    this.state = {
        users: [],
        user: {}
    };
  }

  componentDidMount() {
      this.userService
          .findAllUsers()
          .then(users =>
              this.setState({
                  users: users
              })
          )
  }

  onLogin = () => {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var user = (this.state.users.filter(function (u) {
      if(u.username !== null) {
        return u.username == username && u.password == password
      }
    }).shift())
    if (user != null) {
      var cookie = ['user', '=', JSON.stringify(user), ';'].join('');
      document.cookie = cookie;
    }
    else {
      alert("User not found. Please try again.")
    }
  }


  render() {
      return (
        <div className="container">
            <h1>Welcome back</h1>
        <br/>
        <div>
        <div className="row">
            <div className="col-12">
            <label for="username">Username</label>
            <input id="username" className="form-control"/>
            </div>
            <div className="col-12">
            <br/>
            <label for="password">Password</label>
            <input id="password" className="form-control"/>
            </div>
            </div>
            <br/>
            <div className="row">
            <div className="col-6">
            <label for="password">
            <input type="checkbox"/>
            &nbsp; Remember me
        </label>
        </div>
        <div className="col-6">
            <a className="float-right" href="#">Forgot password?</a>
        </div>
        </div>
        <br/>
        <div className="row">
            <div className="col-12">
            <button
                onClick={this.onLogin}
                className="btn btn-primary"
                type="button">
                Log in
            </button>
            </div>
            </div>
            </div>
            </div>
      );
  }
}

export default Login
