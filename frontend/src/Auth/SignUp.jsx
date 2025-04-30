import React, { useState } from 'react'
import "./auth.css"
import Header from '../Components/Header'
import { URL } from "../url"
import { useNavigate } from "react-router-dom"

function SignUp() {
    const [userInfo, setuserinfo] = useState({
        Name: "",
        Email: "",
        Country: "",
        Password: ""
    })
    const [error, setError] = useState("")
    const navigate = useNavigate();

    // onchange input value function
    const userinfo = (e) => {
        setuserinfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }
    const signIn = (e) => {

        e.preventDefault();
        URL.post("/api/user/signup", userInfo).then(res => {
            if (res.status === 200) {
                alert(res.data.message)
                return navigate("/auth/login")
            }
        }).catch(err => {
            if (err) {
                setError(err.response.data.message)
            }
        })
    }

    return (
        <>
            <Header />
            <div className="login-container">
                <div className="container">
                    {
                        error ? <h5>{error}</h5> : null
                    }
                    <form action="" method='POST' onSubmit={signIn}>
                        <input type="text" name="Name" id="name" placeholder='Enter Your Name' value={userinfo.Name} onChange={userinfo} required />
                        <input type="email" name="Email" id="email" placeholder='abc@gmail.com' value={userinfo.Email} onChange={userinfo} required />
                        <input type="text" name="Country" id="country" placeholder='Enter Your Country' value={userinfo.Country} onChange={userinfo} required />
                        <input type="password" name="Password" id="password" placeholder='*******' value={userinfo.Password} onChange={userinfo} required />
                        <input type="submit" value="Sign Up" />
                    </form>
                    <div className="forget-pass">
                        <a href="/auth/login"><b>LOGIN</b></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp