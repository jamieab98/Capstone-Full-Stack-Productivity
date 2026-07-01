import { useState } from "react"
import { data } from "react-router-dom"

function App(){
  const [newUsername, setNewUsername] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [password, setPassword] = useState("")
  const [userClass, setUserClass] = useState([])
  
  const [workoutType, setWorkoutType] = useState("")
  const [workoutDate, setWorkoutDate] = useState("")
  const [username, setUsername] = useState("")
  const [workoutClass, setWorkoutClass] = useState([])

  const [exerciseName, setExerciseName] = useState("")

  const [weight, setWeight] = useState(0)
  const [time, setTime] = useState(0)
  const [unit, setUnit] = useState("lbs")
  const [reps, setReps] = useState(0)
  const [setNumber, setSetNumber] = useState(1)
  const [setID, setSetID] = useState(1)

  const [exerciseSets, setExerciseSets] = useState([])
  const [exerciseClass, setExerciseClass] = useState([])

  function handleCreateUser(e){
    e.preventDefault()
    setUserClass(prev=>[...prev, {"username": newUsername, "displayname": displayName, "password": password}])
  }

  function handleCreateWorkout(e){
    e.preventDefault()
    setWorkoutClass(prev=>[...prev, {"workouttype": workoutType, "date": workoutDate, "username": username}])
  }

  function handleLogSet(){
    setExerciseSets(prev=>[...prev, {
      "weight": weight,
      "time": time,
      "unit": unit,
      "reps": reps,
      "setnumber": setNumber,
      "setid": setID
    }])
    setSetNumber(setNumber + 1)
    setSetID(setID + 1)
    setWeight(0)
    setTime(0)
    setUnit("lbs")
    setReps(0)
  }

  function handleLogExercise(e){
    e.preventDefault()
    setExerciseClass(prev=>[...prev, {"exercisename": exerciseName, "sets": exerciseSets}])
    setExerciseName("")
    setSetNumber(1)
    setExerciseSets([])
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
          <input type="date" id="date" value={workoutDate} onChange={(e)=>setWorkoutDate(e.target.value)}/>

          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>

          <button type="submit">Create Workout</button>
        </form>
      </div>

      <div>
        <h4>Create Exercise</h4>
        <form>
          <label htmlFor="exercisename">Exercise Name</label>
          <input type="text" id="exercisename" value={exerciseName} onChange={(e)=>setExerciseName(e.target.value)}/>
          <br/>
          <br/>
          Set
          <br/>
          <label htmlFor="weight">Weight</label>
          <input type="number" id="weight" value={weight} onChange={(e)=>setWeight(e.target.value)}/>

          <label htmlFor="time">Time</label>
          <input type="number" id="time" value={time} onChange={(e)=>setTime(e.target.value)}/>

          <label htmlFor="unit">Unit</label>
          <select id="unit" value={unit} onChange={(e)=>setUnit(e.target.value)}>
            <option value="lbs">lbs</option>
            <option value="kgs">kgs</option>
            <option value="secs">secs</option>
            <option value="mins">mins</option>
          </select>

          <label htmlFor="reps">Reps</label>
          <input type="number" id="reps" value={reps} onChange={(e)=>setReps(e.target.value)}/>

          <button type="button" onClick={handleLogSet}>Log Set</button>

          <button type="submit" onClick={handleLogExercise}>Log Exercise</button>
        </form>
      </div>

      <div>
        Users:
        {userClass.map((data, index)=>(
          <div key={index}>
            Username: {data.username}
          </div>
        ))}
      </div>

      <div>
        Workouts:
        {workoutClass.map((data, index)=>(
          <div key={index}>
            Workout Type: {data.workouttype}
            Date: {data.date}
            Username: {data.username}
          </div>
        ))}
      </div>

      <div>
        Exercises:
        {exerciseClass.map((data, index)=>(
          <div key={index}>
            Exercise Name: {data.exercisename}
            {data.sets.map((set, index)=>(
              <p key={index}>Set {index + 1}: {set.weight}{set.unit}: {set.reps} reps. ID: {set.setid}</p>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default App