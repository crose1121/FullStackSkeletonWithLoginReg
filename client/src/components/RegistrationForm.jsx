import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios'

const RegistrationForm = () => {


    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirm, setConfirm] = useState("");

    let [formErrors,setFormErrors] = useState({});

    const history = useHistory();


    const submitHandler = e =>{
        e.preventDefault();

        let formInfo = {firstName, lastName, email, password, confirm};

        axios.post("http://localhost:8000/api/users/register", formInfo, {withCredentials:true})
            .then(response=>{
                console.log("response--->", response)
                if (response.data.errors){
                    setFormErrors(response.data.errors)
                }
                else{
                    history.push("/dashboard")
                }
            })
            .catch(error=>console.log("Error--->  ", error))
    }


    return (
        <div>
            <h3>Register</h3>
            <form action="" onSubmit={submitHandler}>

                <div className="form-group">
                    <label htmlFor="">First Name</label>
                    <input type="text" name="firstName" className='form-control' onChange={(e)=>setFirstName(e.target.value)}/>
                    <p className='text-danger'>{formErrors.firstName?.message}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="">Last Name</label>
                    <input type="text" name="lastName" className='form-control' onChange={(e)=>setLastName(e.target.value)}/>
                    <p className='text-danger'>{formErrors.lastName?.message}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type="text" name="email" className='form-control' onChange={(e)=>setEmail(e.target.value)}/>
                    <p className='text-danger'>{formErrors.email?.message}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" className='form-control' onChange={(e)=>setPassword(e.target.value)}/>
                    <p className='text-danger'>{formErrors.password?.message}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="">Confirm Password</label>
                    <input type="password" name="confirm" className='form-control' onChange={(e)=>setConfirm(e.target.value)}/>
                    <p className='text-danger'>{formErrors.confirm?.message}</p>
                </div>

                <input type="submit" className='btn btn-success mt-3' value="Register"/>
            </form>

        </div>
    );
};


export default RegistrationForm;