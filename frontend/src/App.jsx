import { useState } from "react"

function App(){
  const [newUsername, setNewUsername] = useState("")

  function handleCreateUser(e){
    e.preventDefault()
    console.log(newUsername)
  }

  return(
    <>
      <h1>My App</h1>
      <div>
        <h3>Mock Up Form</h3>
        <h4>Create User</h4>
        <form onSubmit={handleCreateUser}>
          <label htmlFor="username">User Name</label>
          <input type="text" value={newUsername} id="username"onChange={(e)=>setNewUsername(e.target.value)}/>

          <label htmlFor="displayname">Display Name</label>
          <input type="text" id="displayname"/>

          <label htmlFor="password">Password</label>
          <input type="text" id="password"/>

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