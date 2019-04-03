import React from "react";
import Users from "../components/Users";
import UserService from "../services/UserService";

class UsersContainer extends React.Component {
    constructor(props) {
        super(props)
        this.userService = UserService.getInstance()
        this.state = {
            users: []
        }
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

    render() {
        console.log("Passing users");
        console.log(this.state.users);
        return (<Users users={this.state.users}/>);
    }
}

export default UsersContainer;
