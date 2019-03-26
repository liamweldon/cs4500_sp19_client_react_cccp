import React from "react";

const UsersDetails = ({users, user, cancel, createUser, updateUser, deleteUser, selectUser, setUser, redirect}) => (
    <div>
        <div>
            <h3>User Details</h3>
            <select
                value={user.id}
                onChange={(e) => selectUser(e.target.value)}
                className="form-control">
                {users.map(user => {
                    //var selected = user.id === user.id ? true : false;
                    var selected = user.id

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
                setUser({
                    user: {
                        id: e.target.value,
                        username: user.username,
                        password: user.password,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }
                })} className="form-control"
                   value={user.id}/>
            <br/><label>Username</label>
            <input onChange={(e) =>
                setUser({
                    user: {
                        id: user.id,
                        username: e.target.value,
                        password: user.password,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }
                })} className="form-control"
                   value={user.username}/>
            <br/><label>Password</label>
            <input onChange={(e) =>
                setUser(
                    {
                        user: {
                            id: user.id,
                            username: user.username,
                            password: e.target.value,
                            firstName: user.firstName,
                            lastName: user.lastName
                        }
                    })} className="form-control"
                   value={user.password}/>
            <br/><label>First Name</label>
            <input onChange={(e) =>
                setUser({
                    user: {
                        id: user.id,
                        username: user.username,
                        password: user.password,
                        firstName: e.target.value,
                        lastName: user.lastName
                    }
                })} className="form-control"
                   value={user.firstName}/>
            <br/><label>Last Name</label>
            <input onChange={(e) =>
                setUser({
                    user: {
                        id: user.id,
                        username: user.username,
                        password: user.password,
                        firstName: user.firstName,
                        lastName: e.target.value
                    }
                })} className="form-control"
                   value={user.lastName}/>
            <br/></div>
        <div>
            <button className="btn btn-primary" onClick={() => {
                createUser().then(window.setTimeout(redirect("/admin/users/"), 500))
                window.location.reload();
            }}>
                Create
            </button>
            &nbsp;
            <button className="btn btn-success" onClick={
                () => {
                    updateUser().then(window.setTimeout(redirect("/admin/users/"), 500))
                    window.location.reload();
                }
            }>Update
            </button>
            &nbsp;
            <button className="btn btn-danger" onClick={
                () => {
                    deleteUser().then(window.setTimeout(redirect("/admin/users/"), 500))
                    window.location.reload();
                }
            }>Delete
            </button>
            &nbsp;
            <button className="btn btn-danger" onClick={
                cancel}>
                Cancel
            </button>
            <br/>
            &nbsp;
        </div>
    </div>
);

export default UsersDetails
