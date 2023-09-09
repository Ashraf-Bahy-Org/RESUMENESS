import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

const Sign = () => {
    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8000/signup",{
                email,password
            })
            .then(res=>{
                if(res.data=="exist"){
                    alert("User already exists")
                }
                else if(res.data=="notexist"){
                    history("/Profile")
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
        <div className="Sign">
            <div className="signUpContainer">
                <h1>Sign Up</h1>
                <form className="signUpForm" onSubmit={submit}>
                    <label>Username:</label>
                    <input type="text" required />
                    <label>Email:</label>
                    <input type="text" onChange={(e) => { setEmail(e.target.value) }} required />
                    <label>Password:</label>
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} required />
                    <button className="sign-button" type="submit">Sign Up</button>
                </form>
                <h5> Already have an account?
                    <Link to='/Login'>
                        <h6>Log In</h6>
                    </Link>
                </h5>
            </div>
        </div>
    );
}

export default Sign;