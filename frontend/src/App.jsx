import { useState } from "react"

function App(){
  const [newUsername, setNewUsername] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [password, setPassword] = useState("")

  function handleCreateUser(e){
    e.preventDefault()
    console.log(newUsername)
    console.log(displayName)
    console.log(password)
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
        <h4>Information Display</h4>
      </div>
    </>
  )
}

export default App