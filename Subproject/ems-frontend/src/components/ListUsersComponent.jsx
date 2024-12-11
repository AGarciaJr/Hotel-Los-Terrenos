import React, {useEffect, useState} from 'react'
import { deleteUser, listUsers } from '../services/UserService'
import {useNavigate} from 'react-router-dom'

const ListUsersComponent = () => {

    const [users, setUsers] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllUsers();
    },[])

    function getAllUsers(){
        listUsers().then((response) =>{
            setUsers(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewUser(){
        navigator('/add-user')
    }

    function updateUser(id){
        navigator(`/edit-user/${id}`)
    }

    function removeUser(id){
        console.log(id);
        deleteUser(id).then((response) => {
            getAllUsers();
        }).catch(error =>{
            console.error(error);
        })
    }

    return (
        <div className = 'container'>
            <h2 className = 'text-center'>List of Users</h2>
            <button className="btn btn-primary" onClick={addNewUser}>Add User</button>

            <table className = 'table table-striped table-bordered'>
                <thead>
                <tr>
                    <th>User Id</th>
                    <th>User Name</th>
                    <th>Password</th>
                    <th>User Email</th>
                    <th>Phone Number</th>
                    <th>Role</th>
                    <th>Corporations</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map(user =>
                        <tr key = {user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            <td>{user.company}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateUser(user.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeUser(user.id)}
                                        style={{marginLeft: '10px'}}
                                >Delete</button>
                            </td>
                        </tr>)
                }
                </tbody>
            </table>
        </div>
    )
}

export default ListUsersComponent