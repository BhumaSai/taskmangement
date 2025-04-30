import React, { useState } from 'react'
import Header from '../Components/Header'
import './auth.css'
import { URL } from "../url"
import { useNavigate } from 'react-router-dom'


function Login() {
    // navigate function
    const navigate = useNavigate()

    const [cred, setcred] = useState({
        Email: "",
        Password: ""
    })

    const [error, setError] = useState("")

    const login = (e) => {
        setcred({
            ...cred,
            [e.target.name]: e.target.value
        })
    }



    const submitLogin = (e) => {
        try {
            e.preventDefault();
            URL.post("/api/user/login", cred).then(res => {
                if (res.data.go) {
                    alert(res.data.message);
                    localStorage.setItem("signed", true)
                    return navigate("/")
                }
            }).catch(err => {
                if (err) {
                    setError(err.response.data.message)
                }
            })
        } catch (error) {
            setError("Something went wrong")
        }
    }

    setTimeout(() => {
        setError("")
    }, 5000)

    return (
        <>
            <Header />
            <div className="login-container">
                <div className="container">
                    {
                        error ? <h5>{error}</h5> : null
                    }
                    <form action="" method='POST' onSubmit={submitLogin}>
                        <input type="email" name="Email" id="email" placeholder='abc@gmail.com' value={cred.email} onChange={login} />
                        <input type="password" name="Password" id="password" placeholder='*******' value={cred.password} onChange={login} />
                        <input type="submit" value="Login" />
                    </form>
                    <div className="forget-pass">
                        <a href="/">forget password</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login