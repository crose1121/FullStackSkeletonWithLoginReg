import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {

    const [loggedInUser, setLoggedInUser] = useState({});

    const history = useHistory();

    useEffect(()=>{
        axios.get("http://localhost:8000/api/users/getloggedinuser", {withCredentials:true})
            .then(res=>{
                console.log("Response when getting logged in user--->", res)
                if (res.data.results) {
                    setLoggedInUser(res.data.results)
                }
            })
            .catch(err=>{
                console.log("Error when getting logged in user--->", err)
                history.push("/")
            })
    },[])

    const logout = () =>{
        axios.get("http://localhost:8000/api/users/logout", {withCredentials: true})
            .then(res=>history.push("/"))
            .catch(err=>console.log("Error when logging out--->", err))
    }

    return (
        <div>
            <h1>Welcome {loggedInUser.firstName}</h1>
            <button onClick={logout} className="btn btn-info">Logout</button>
        </div>
    );
};


export default Dashboard;