import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const LoginForm = () => {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [loginFormError, setLoginFormError] = useState("");

    const history = useHistory();

    const login = e =>{
        e.preventDefault();

        let formInfo = {
            email, password
        }

        axios.post("http://localhost:8000/api/users/login", formInfo, {withCredentials:true})
            .then(res=>{
                res.data.error?
                setLoginFormError(res.data.error)
                :history.push("/dashboard")
            })
            .catch(err=>console.log("Error when logging in: ", err))
    }

    return (
        <div>
            <h3>Login</h3>
            <form action="" onSubmit={login}>
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type="text" name="email" className='form-control' onChange={(e)=>setEmail(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" className='form-control' onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                    <p className='text-danger'>{loginFormError}</p>

                <input type="submit" className='btn btn-info mt-3'/>
            </form>
        </div>

    );
};


export default LoginForm;