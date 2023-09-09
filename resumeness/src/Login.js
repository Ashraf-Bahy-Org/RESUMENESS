import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

const Login = () => {
    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8000/login",{
                email,password
            })
            .then(res=>{
                if(res.data=="exist"){
                    history("/Profile")
                }
                else if(res.data=="notexist"){
                    alert("User have not sign up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }
    }
        return (
            <div className="Login">
                <div className="loginContainer">
                    <h1>Log In</h1>
                    <form className="LoginForm" onSubmit={submit}>
                        <label>Email:</label>
                        <input type="text" onChange={(e) => { setEmail(e.target.value) }} required />
                        <label>Password:</label>
                        <input type="password" onChange={(e) => { setPassword(e.target.value) }} required />
                        <button className="login-button" type="submit">Log In</button>
                    </form>
                    <h5> Don't have an account?
                        <Link to='/Sign'>
                            <h6>Sign Up</h6>
                        </Link>
                    </h5>
                </div>
            </div>
        );
    }
    
export default Login;