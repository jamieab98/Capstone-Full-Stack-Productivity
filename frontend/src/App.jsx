import { useState, useEffect } from "react"
import { data } from "react-router-dom"

function App(){
  const [newUsername, setNewUsername] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [password, setPassword] = useState("")
  const [userID, setUserID] = useState(1)
  
  const [workoutType, setWorkoutType] = useState("Leg")
  const [workoutDate, setWorkoutDate] = useState("")
  const [workoutUserID, setWorkoutUserID] = useState(0)
  const [workoutClass, setWorkoutClass] = useState([])
  const [workoutID, setWorkoutID] = useState(1)

  const [exerciseName, setExerciseName] = useState("")
  const [exerciseID, setExerciseID] = useState(1)
  const [exerciseWorkoutID, setExerciseWorkoutID] = useState(1)

  const [weight, setWeight] = useState(0)
  const [time, setTime] = useState(0)
  const [unit, setUnit] = useState("lbs")
  const [reps, setReps] = useState(0)
  const [setNumber, setSetNumber] = useState(1)
  const [setID, setSetID] = useState(1)

  const [exerciseSets, setExerciseSets] = useState([])
  const [exerciseClass, setExerciseClass] = useState([])

  const [users, setUsers] = useState([])
  const [workouts, setWorkouts] = useState([])
  const [exercises, setExercises] = useState([])

  function getUsers(){
    fetch("http://127.0.0.1:5000/users")
    .then(response => response.json())
    .then(data => setUsers(data))
  }

  function getWorkouts(){
    fetch("http://127.0.0.1:5000/workouts")
    .then(response => response.json())
    .then(data => setWorkouts(data))
  }

  function getExercises(){
    fetch("http://127.0.0.1:5000/exercises")
    .then(response => response.json())
    .then(data => {
      setExercises(data)
      console.log(data)
    })
  }

  function handleCreateUser(e){
    e.preventDefault()
    fetch("")
  }

  function handleCreateWorkout(e){
    e.preventDefault()
    setWorkoutClass(prev=>[...prev, {"workouttype": workoutType, "date": workoutDate, "workoutuserid": workoutUserID, "workoutid": workoutID}])
    setWorkoutDate("")
    setWorkoutUserID(0)
    setWorkoutID(workoutID + 1)
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
    setExerciseClass(prev=>[...prev, {"exercisename": exerciseName, "exerciseid": exerciseID, "sets": exerciseSets, "workoutid": exerciseWorkoutID}])
    setExerciseName("")
    setSetNumber(1)
    setExerciseSets([])
    setExerciseID(exerciseID + 1)
    setExerciseWorkoutID(0)
  }

  function handleDeleteUser(id){
    const user = userClass.find(u=>u.userid==id)
    setUserClass(prev=>prev.filter(u=>u!=user))
  }

  function handleDeleteWorkout(id){
    const workout = workoutClass.find(w=>w.workoutid==id)
    setWorkoutClass(prev=>prev.filter(w=>w!=workout))
  }

  function handleDeleteExercise(id){
    const exercise = exerciseClass.find(e=>e.exerciseid==id)
    setExerciseClass(prev=>prev.filter(e=>e!=exercise))
  }

  function handleUpdateUser(id){
    const user = userClass.find(u=>u.userid==id)
    setNewUsername(user.username)
    setDisplayName(user.displayname)
    setPassword(user.password)
    setUserID(user.userid)
  }

  function handleFinalizeUpdateUser(){
    setUserClass(prev=>prev.map(u=>u.userid==userID?{"username": newUsername, "displayname": displayName, "password": password, "userid": userID}:u))
    setNewUsername("")
    setDisplayName("")
    setPassword("")
    setUserID(userClass[userClass.length-1].userid + 1)
  }

  function handleUpdateWorkout(id){
    const workout = workoutClass.find(w=>w.workoutid==id)
    setWorkoutType(workout.workouttype)
    setWorkoutDate(workout.date)
    setWorkoutUserID(workout.workoutuserid)
    setWorkoutID(workout.workoutid)
  }

  function handleFinalizeUpdateWorkout(){
    setWorkoutClass(prev=>prev.map(w=>w.workoutid==workoutID?{"workouttype": workoutType, "date": workoutDate, "workoutuserid": workoutUserID, "workoutid": workoutID}:w))
    setWorkoutType("Leg")
    setWorkoutDate("")
    setWorkoutUserID(0)
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
          <button type="button" onClick={handleFinalizeUpdateUser}>Update User</button>
        </form>
      </div>

      <div>
        <h4>Create Workout</h4>
        <form onSubmit={handleCreateWorkout}>
          <label htmlFor="workouttype">Workout Type</label>
          <select value={workoutType} onChange={(e)=>setWorkoutType(e.target.value)} id="workouttype">
            <option value="Leg">Leg</option>
            <option value="Push">Push</option>
            <option value="Pull">Pull</option>
            <option value="Upper">Upper</option>
            <option value="Full">Full Body</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="date">Date: </label>
          <input type="date" id="date" value={workoutDate} onChange={(e)=>setWorkoutDate(e.target.value)}/>

          <label htmlFor="workoutuserid">UserId: </label>
          <input type="number" id="workoutuserid" value={workoutUserID} onChange={(e)=>setWorkoutUserID(e.target.value)}/>

          <button type="submit">Create Workout</button>
          <button type="button" onClick={handleFinalizeUpdateWorkout}>Update Workout</button>
        </form>
      </div>

      <div>
        <h4>Create Exercise</h4>
        <form>
          <label htmlFor="exercisename">Exercise Name</label>
          <input type="text" id="exercisename" value={exerciseName} onChange={(e)=>setExerciseName(e.target.value)}/>

          <label htmlFor="workoutid">Workout ID</label>
          <input type="number" id="workoutid" value={exerciseWorkoutID} onChange={(e)=>setExerciseWorkoutID(e.target.value)}/>          
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
        <br/>
        <button type="button" onClick={getUsers}>Get Users</button>
        <br/>
        Users:
        {users.map((u, index)=>(
          <div key={index}>
            Username: {u.username}<br/>
            Displayname: {u.displayname}<br/>
            User ID: {u.id}<br/>
          </div>
        ))}
        <br/>
      </div>

      <div>
        <button type="button" onClick={getWorkouts}>Get Workouts</button>
        <br/>
        Workouts:
        {workouts.map((w, index)=>(
          <div key={index}>
            Workout Type: {w.workouttype}<br/>
            Date: {w.date}<br/>
            Workout ID: {w.id}<br/><br/>
          </div>
        ))}
      </div>

      <div>
        <button type="button" onClick={getExercises}>Get Exercises</button>
        <br/>
        Exercises:
        {exercises.map((e, index)=>(
          <div key={index}>
            Exercise Name: {e.exercisename}<br/>
            Sets: {e.sets.map((s, i)=>(
              <div key={i}>
                Set {i+1}<br/>
                Reps: {s.reps}<br/>
                Weight: {s.weight}<br/>
                Time: {s.time}<br/>
                Unit: {s.unit}<br/><br/>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default App