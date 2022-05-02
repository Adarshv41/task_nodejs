import axios from 'axios';
import React,{ useState } from 'react';
import '../CSS/register.css'

const Register = () => {
    const [fullName, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/user/', {fullName, email, password})
        .then(
            (res) => {
                console.log(res.data)
            }
        ).catch((e) => console.log(e));
    }
    return (
    <div className='rcontainer'>
        <div className='rsub-container'>
            <div>
            <h1 >Register</h1>
            <div className='rform'>
            <form onSubmit={handleSubmit} >
                <div className='rform-group'>
                <label className='form-label'>Full Name</label>
                    <input className="rform-control" type = "fullName" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className='rform-group'>
                <label className='form-label'>Email</label>
                    <input className="rform-control" type = "email" onChange= {(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='rform-group'>
                <label className='form-label'>Password</label>
                    <input className="rform-control" type = "password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className='rform-group'>
                <input className="rsubmit" type="submit" value = "Submit"></input>
                </div>
            </form>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Register;
