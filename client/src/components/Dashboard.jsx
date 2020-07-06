import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const [ users, setUsers ] = useState([]);
  const history = useHistory();

  const getUsers = () => {
    axiosWithAuth()
      .get('http://localhost:5000/api/users')
      .then(res => {
        console.log(res);
        setUsers(res.data.users);
      })
      .catch(err => console.log(err));
  };

  const logout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  useEffect(() => {
    getUsers();
  }, [])
  
  return (
    <div className='dashboard'>
      <h1>Users</h1>
      {
        users.map((user, index) => {
          return <div className='user' key={index} >
            <h2>ID: {user.id}</h2>
            <h2>USERNAME: {user.username}</h2>
            <h2>DEPARTMENT: {user.department}</h2>
          </div>
        })
      }
      <button onClick={logout}>Log Out</button>
    </div>
  )
}

export default Dashboard;