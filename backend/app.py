from flask import Flask
from flask_restful import Api, Resource
from extensions import db, cors
from flask_migrate import Migrate

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
cors(app)

from models import User, Workout, Exercise, ExerciseSet

migrate = Migrate(app, db)

api = Api(app)

class Home(Resource):
    def get(self):
        return{"message": "Backend is running"}

class Users(Resource):
    def get(self):
        allUsers = []
        users = User.query.all()
        for u in users:
            user = {'id': u.id, 'username': u.username, 'displayname': u.display_name}
            allUsers.append(user)
        return(allUsers), 200

class SingleUser(Resource):
    def get(self, id):
        u = User.query.filter_by(id=id).first()
        user_data = {'id': u.id, 'username': u.username, 'displayname': u.display_name}
        return(user_data), 200

class Workouts(Resource):
    def get(self):
        allWorkouts = []
        workouts = Workout.query.all()
        for w in workouts:
            workout = {'id': w.id, 'workouttype': w.workout_type, 'date': w.date.isoformat(), 'userid': w.user_id}
            allWorkouts.append(workout)
        return(allWorkouts), 200

class SingleWorkout(Resource):
    def get(self, id):
        w = Workout.query.filter_by(id=id).first()
        workout_data = {'id': w.id, 'workouttype': w.workout_type, 'date': w.date.isoformat(), 'userid': w.user_id}
        return(workout_data)

class Exercises(Resource):
    def get(self):
        allExercises = []
        exercises = Exercise.query.all()
        for e in exercises:

            exercise = {'id': e.id, 'exercisename': e.exercise_name, 'workoutid': e.workout_id}
            allExercises.append(exercise)
        return(allExercises)

class SingleExercise(Resource):
    def get(self, id):
        e = Exercise.query.filter_by(id=id).first()
        sets = []
        for s in e.exercise_sets:
            set = {'id': s.id, 'reps': s.reps, 'weight': s.weight, 'time': s.time, 'unit': s.unit}
            sets.append(set)
        exercise_data = {'id': e.id, 'exercisename': e.exercise_name, 'workoutid': e.workout_id, 'sets': sets}
        return(exercise_data)

api.add_resource(Home, "/")
api.add_resource(Users, "/users")
api.add_resource(SingleUser, "/user/<int:id>")
api.add_resource(Workouts, "/workouts")
api.add_resource(SingleWorkout, "/workout/<int:id>")
api.add_resource(Exercises, "/exercises")
api.add_resource(SingleExercise, "/exercise/<int:id>")

if __name__ == "__main__":
    app.run(debug=True)