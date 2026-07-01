function UserDisplay({index, data}){

    return(
        <>
            <div>
                <div>Username: {data.username}</div>
                <div>Display Name: {data.displayname}</div>
                <div>Workouts: {data.workouts}</div>
            </div>
            <br/>
        </>
    )
}

export default UserDisplay