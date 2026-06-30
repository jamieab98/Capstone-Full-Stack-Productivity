import { useState } from "react"

function App(){
  const [newUsername, setNewUsername] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [password, setPassword] = useState("")
  
  const [workoutType, setWorkoutType] = useState("")
  const [workoutDate, setWorkoutDate] = useState("")
  const [username, setUsername] = useState("")

  function handleCreateUser(e){
    e.preventDefault()
    console.log(newUsername)
    console.log(displayName)
    console.log(password)
  }

  function handleCreateWorkout(e){
    e.preventDefault()
    console.log(workoutType)
    console.log(workoutDate)
    console.log(username)
  }

  return(
    <>
      <h1>My App</h1>
      <div>
        <h3>Mock Up Form</h3>
        <h4>Create User</h4>
        <form onSubmit={handleCreateUser}>
          <label htmlFor="username">User Name</label>
          <input type="text" value={newUsername} id="username" onChange={(e)=>setNewUsername(e.target.value)}/>

          <label htmlFor="displayname">Display Name</label>
          <input type="text" value={displayName} id="displayname" onChange={(e)=>setDisplayName(e.target.value)}/>

          <label htmlFor="password">Password</label>
          <input type="password" value={password} id="password" onChange={(e)=>setPassword(e.target.value)}/>

          <button type="submit">Create User</button>
        </form>
      </div>

      <div>
        <h4>Create Workout</h4>
        <form onSubmit={handleCreateWorkout}>
          <label htmlFor="workouttype">Workout Type</label>
          <select value={workoutType} onChange={(e)=>setWorkoutType(e.target.value)} id="workouttype">
            <option value="leg">Leg</option>
            <option value="push">Push</option>
            <option value="pull">Pull</option>
            <option value="upper">Upper</option>
            <option value="lower">Lower</option>
            <option value="full">Full Body</option>
            <option value="other">Other</option>
          </select>

          <label htmlFor="date">Date: </label>
          <input type="date" id="date" value={workoutDate} onChange={(e)=>setWorkoutDate(e.target.value)}></input>

          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={(e)=>setUsername(e.target.value)}></input>

          <button type="submit">Create Workout</button>
        </form>
      </div>

      <div>
        <h4>Create Exercise</h4>
      </div>
      <div>
        <h4>Information Display</h4>
      </div>
    </>
  )
}

export default App