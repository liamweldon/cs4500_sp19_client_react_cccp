import React from "react";
import UsersDetails from "../components/UserDetails";
import UserService from "../services/UserService";

class UsersDetailsContainer extends React.Component {
    constructor(props) {
        super(props)
        this.userService = UserService.getInstance();
        this.state = {
            users: [],
            user: {
                username: '',
                firstName: '',
                lastName: '',
            }
        }
    }

    componentDidMount() {
        this.userService
            .findAllUsers()
            .then(users => {
                    const currentUserId = this.props.match.params.id;
                    this.selectUser(currentUserId);

                    this.setState({
                        users: users
                    })
                }
            )
    }

    cancel = () =>
        this.props.history.push("/admin/users");

    createUser = () =>
        this.userService.createUser(this.state.user);

    updateUser = () =>
        this.userService
            .updateUser(this.state.user)
            .then(this.props.history.push("/admin/users/"));

    deleteUser = () =>
        this.userService
            .deleteUser(this.state.user.id)
            .then(this.props.history.push("/admin/users/"));

    setUser = (new_attrs) => this.setState(new_attrs);

    redirect = (path) =>
        this.props.history.push(path);

    selectUser = id =>
        this.userService
            .findUserById(id)
            .then(user => {
                    //this.props.history.push("/admin/users/" + id)
                    this.setState({
                        user: user
                    })
                }
            )

    render() {
        console.log("Passing users");
        console.log(this.state.users);
        return (<UsersDetails users={this.state.users}
                              user={this.state.user}
                              cancel={this.cancel}
                              createUser={this.createUser}
                              updateUser={this.updateUser}
                              deleteUser={this.deleteUser}
                              selectUser={this.selectUser}
                              setUser={this.setUser}
                              redirect={this.redirect}/>);
    }
}

export default UsersDetailsContainer;
