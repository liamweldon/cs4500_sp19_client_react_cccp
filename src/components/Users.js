import React from 'react'
import {Link} from "react-router-dom";

const Users = ({users}) => (
        <div>
            <h3>Users</h3>
            <table className="table">
                <tbody>
                <tr>
                    <td>ID</td>
                    <td>Username</td>
                    <td>Password</td>
                    <td>First Name</td>
                    <td>Last Name</td>
                </tr>
                {
                    users
                        .map(user =>

                            <tr key={user.id}>
                                <td>
                                    <Link to={"/admin/users/" + user.id}>
                                        {user.id}
                                    </Link>
                                </td>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                            </tr>
                        )
                }
                </tbody>
            </table>
        </div>
);

export default Users
