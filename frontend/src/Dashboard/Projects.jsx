import React, { useEffect, useState } from 'react'
import "./dashboard.css"
import { URL } from '../url'

function Project() {
    const [projects, setProjects] = useState()
    const [pid, setPid] = useState()

    // task array
    const [tasks, setTasks] = useState([])

    // create task variable 
    const [createTask, setCreateTask] = useState(false)

    // task object 
    const [taskObj, setTaskObj] = useState({
        Title: "",
        Description: ""
    })

    // projects retrieving api
    useEffect(() => {
        URL.get("/api/dashboard/projects", { withCredentials: true }).then(res => {
            setProjects(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])


    const getProject = (da) => {
        setPid(da._id)
        URL.get(`/api/dashboard/project/tasks/${da._id}`, { withCredentials: true }).then(res => {
            setTasks(res.data.response)
        }).catch(err => {
            console.log(err)
        })
    }


    // creating Task
    const postTask = (e) => {
        e.preventDefault();
        const task = { pid: pid, Title: taskObj.Title, Description: taskObj.Description }
        setCreateTask(false)
        setTaskObj({
            Title: "",
            Description: ""
        })
        URL.post("/api/dashboard/project/createtask", task, { withCredentials: true }).then(res => {
            alert(res.data.message)
        }).catch(err => {
            console.log(err)
        })
    }


    return (
        <>
            <section className='project-tasks'>
                <div className='projects-container'>
                    <div className="projects">
                        {/* fetching projects which is realated to the user */}
                        {
                            projects ? Array.isArray(projects) && projects.map(da => {
                                return (
                                    <div key={da._id} onClick={() => getProject(da)}>
                                        <h3>{da.ProjectName}</h3>
                                    </div>
                                )
                            }) : <h3>Empty Projects</h3>
                        }

                    </div>
                </div>
                <div className='task-section'>
                    <div className="create-task">
                        {
                            pid ? <button type="button" onClick={() => setCreateTask(!createTask)}>Create Task</button> : null
                        }
                    </div><br />
                    <div className="task-list">
                        {/* fetching project tasks which is realated to the user */}
                        {
                            Array.isArray(tasks) ? tasks.map(da => {
                                const { Title, Description, status } = da;
                                return (
                                    <div className="tasks" key={da.idx}>
                                        <h3 style={{ color: status === "pending" ? "orange" : "green" }}><b style={{ color: "black" }}>status</b> : {status}</h3>
                                        <h2>{Title}</h2>
                                        <p>{Description}</p>
                                        <button onClick={() => {
                                            URL.put(`/api/dashboard/project/taskstatus/${pid}`, { tid: da.idx, status: "Completed" }, { withCredentials: true }).then(res => {
                                                alert(res.data.message)
                                            }).catch(err => {
                                                console.log(err)
                                            })
                                        }}>Update  Status</button>
                                        <button onClick={() => {
                                            URL.delete(`/api/dashboard/project/taskdelete/${pid}/${da.idx}`).then(res => {
                                                const result = tasks.filter(data => {
                                                    return data.idx != da.idx
                                                })
                                                setTasks(result)
                                            }).catch(err => {
                                                console.log(err)
                                            })
                                        }}>Delete Task</button>
                                    </div>

                                )
                            }) : <h1>{tasks}</h1>
                        }
                    </div>
                </div>
            </section>
            {
                createTask ?
                    <div className="create-form">
                        <form method='POST' onSubmit={postTask}>
                            <input type="text" name="Title" id="title" placeholder='Enter Task Title' value={taskObj.Title} onChange={(e) => setTaskObj({ ...taskObj, Title: e.target.value })} />
                            <input type="text" name="Description" id="Description" placeholder='Enter Title Description' value={taskObj.Description} onChange={(e) => setTaskObj({ ...taskObj, Description: e.target.value })} />
                            <input type="submit" value="Create Task" />
                            <button onClick={() => setCreateTask(!createTask)}>cancel</button>
                        </form>
                    </div>
                    : null
            }

        </>
    )
}

export default Project