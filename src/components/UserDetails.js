import React from 'react'
import UserService from '../services/UserService'

class UserDetails extends React.Component {
    constructor(props) {
        super(props)
        this.userService = UserService.getInstance()
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
                        // TODO fix
                        //user: users[0]
                    })
                }
            )
    }

    cancel = () =>
        this.props.history.push("/admin/users");

    createUser = () =>
        this.userService
            .createUser(this.state.user);

    updateUser = () =>
        this.userService
            .updateUser(this.state.user)
            .then(this.props.history.push("/admin/users/"));

    deleteUser = () =>
        this.userService
            .deleteUser(this.state.user)
            .then(this.props.history.push("/admin/users/"));

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
        return (
            <div>
                <div>
                    <h3>User Details</h3>
                    <select
                        value={this.state.user.id}
                        onChange={(e) => this.selectUser(e.target.value)}
                        className="form-control">
                        {this.state.users.map(user => {
                            //var selected = user.id === this.state.user.id ? true : false;
                            var selected = this.state.user.id

                            return (
                                <option
                                    value={user.id}
                                    key={user.id}
                                    defaultValue={selected}
                                >
                                    {user.id}
                                </option>
                            );
                        })}
                    </select>
                    <br/><br/><label>ID</label>
                    <input onChange={(e) =>
                        this.setState({
                            user: {
                                id: e.target.value,
                                username: this.state.user.username,
                                password: this.state.user.password,
                                firstName: this.state.user.firstName,
                                lastName: this.state.user.lastName
                            }
                        })} className="form-control"
                           value={this.state.user.id}/>
                    <br/><label>Username</label>
                    <input onChange={(e) =>
                        this.setState({
                            user: {
                                id: this.state.user.id,
                                username: e.target.value,
                                password: this.state.user.password,
                                firstName: this.state.user.firstName,
                                lastName: this.state.user.lastName
                            }
                        })} className="form-control"
                           value={this.state.user.username}/>
                    <br/><label>Password</label>
                    <input onChange={(e) =>
                        this.setState(
                            {
                                user: {
                                    id: this.state.user.id,
                                    username: this.state.user.username,
                                    password: e.target.value,
                                    firstName: this.state.user.firstName,
                                    lastName: this.state.user.lastName
                                }
                            })} className="form-control"
                           value={this.state.user.password}/>
                    <br/><label>First Name</label>
                    <input onChange={(e) =>
                        this.setState({
                            user: {
                                id: this.state.user.id,
                                username: this.state.user.username,
                                password: this.state.user.password,
                                firstName: e.target.value,
                                lastName: this.state.user.lastName
                            }
                        })} className="form-control"
                           value={this.state.user.firstName}/>
                    <br/><label>Last Name</label>
                    <input onChange={(e) =>
                        this.setState({
                            user: {
                                id: this.state.user.id,
                                username: this.state.user.username,
                                password: this.state.user.password,
                                firstName: this.state.user.firstName,
                                lastName: e.target.value
                            }
                        })} className="form-control"
                           value={this.state.user.lastName}/>
                    <br/></div>
                <div>
                    <button className="btn btn-primary" onClick={() => {
                        this.createUser().then(window.setTimeout(this.props.history.push("/admin/users/"), 500))
                    }}>
                        Create
                    </button>
                    &nbsp;
                    <button className="btn btn-success" onClick={
                        () => {
                            this.updateUser().then(window.setTimeout(this.props.history.push("/admin/users/"), 500))
                        }
                    }>Update
                    </button>
                    &nbsp;
                    <button className="btn btn-danger" onClick={
                        () => {
                            this.deleteUser().then(window.setTimeout(this.props.history.push("/admin/users/"), 500))
                        }
                    }>Delete
                    </button>
                    &nbsp;
                    <button className="btn btn-danger" onClick={
                        this.cancel}>
                        Cancel
                    </button>
                    <br/>
                </div>
            </div>

        )
    }
}

export default UserDetails