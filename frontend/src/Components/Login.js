import React,{useState} from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import '../CSS/login.css';


const Login = () => {
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  //  const  = useHistory();

    const handleSubmit = (e) => {
      e.preventDefault()
      axios.post('http://localhost:8000/user/login', {email, password})
        .then(
          (res) => {
           console.log('res', res.data);
          //  history.push('/home')

          }
        ).catch((err) => err)
    }
    
  
  return (
    <div className='container'>
      <div className='sub-container'>
        <div>
          <h1>Login</h1>
            <div className='form'>
              <form onSubmit={handleSubmit} >
                <div className='form-group '>
                  <label className='label'>Email</label>
                    <input type = "email" 
                    required
                    onChange= {(e) => setEmail(e.target.value)}
                    className="form-control"/>
                </div>
                <div className='form-group'>
                  <label className='label'>Password</label>
                    <input type = "password" 
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"/>
                </div>
                <div className='form-group'>
                  <input type="submit" 
                    value = "Submit"
                    className='submit'></input>
                </div>
              </form> 
            </div>
            <div className='new-user'>
              New user?
              <Link to ='/register'>Register Here</Link>
            </div>
        </div>
      </div>
    </div>
  )
  
}

export default Login;
