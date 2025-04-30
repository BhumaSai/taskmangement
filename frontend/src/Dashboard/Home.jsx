import React, { useEffect, useState } from 'react'
import "./dashboard.css"
import Header from '../Components/Header';
import { URL } from '../url';
import Project from './Projects';
import { useNavigate } from "react-router-dom"
function Home() {
    const [create, setCreate] = useState(false)
    const [projectName, setProjectName] = useState("")

    const CreateProject = (e) => {
        e.preventDefault();
        // creating project 
        URL.post("/api/dashboard/createProject", {
            ProjectName: projectName
        }, { withCredentials: true }).then((data) => {
            setCreate(false)
            navigate("/")
            alert(data.data.message)
        }).catch(err => {
            console.log(err)
        })
    }
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem("signed")) {
            navigate("/auth/login")
        }
    }, [])
    return (
        <>
            <Header />
            <div className="create-project">
                {
                    localStorage.getItem("signed") ?
                        <div>
                            <button type="submit" onClick={() => {
                                URL.get("/api/user/logout", { withCredentials: true }).then(() => {
                                    return navigate("/auth/login")
                                })
                            }}>Log Out</button><br /><br />
                            <button type="button" onClick={() => setCreate(!create)}>Create Project</button>
                        </div> :
                        <a href="/auth/login">LOGIN</a>
                }
            </div>
            <Project />
            {
                create ?
                    <div className="create-form">
                        <form method='POST' onSubmit={CreateProject}>
                            <input type="text" name="ProjectName" id="pname" placeholder='Enter Project Name To Create' value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                            <input type="submit" value="Create" />
                            <button onClick={() => setCreate(!create)}>cancel</button>
                        </form>
                    </div>
                    : null
            }
        </>
    )
}

export default Home;