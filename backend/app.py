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
        workouts = []
        data = Workout.query.all()
        for workout in data:
            workout_data = {
                "workout_id": workout.id,
                "workout_type": workout.workout_type,
                "user_id": workout.user_id,
            }
            workouts.append(workout_data)
        return(workouts)

class SingleWorkout(Resource):
    def get(self, id):
        workout = Workout.query.filter_by(id=id).first()
        exercises = []
        for exercise in workout.exercises:
            exercises.append({
                "exercise_name": exercise.exercise_name,
                "exercise_id": exercise.id
            })
        workout_data = {
            "workout_type": workout.workout_type,
            "date": workout.date.isoformat(),
            "exercises": exercises
        }
        return(workout_data)

class Exercises(Resource):
    def get(self):
        exercises = []
        data = Exercise.query.all()
        for exercise in data:
            exercise_data = {
                "exercise_id": exercise.id,
                "exercise_name": exercise.exercise_name,
                "workout_id": exercise.workout_id
            }
            exercises.append(exercise_data)
        return(exercises)

class SingleExercise(Resource):
    def get(self, id):
        exercise = Exercise.query.filter_by(id=id).first()
        sets_data = []
        sets = exercise.exercise_sets
        for set in sets:
            set_data = {
                "reps": set.reps,
                "weight": set.weight,
                "time": set.time,
                "unit": set.unit,
                "set_id": set.id,
                "exercise_id": set.exercise_id
            }
            sets_data.append(set_data)
        exercise_data = {
            "exercise_name": exercise.exercise_name,
            "exercise_id": exercise.id,
            "workout_id": exercise.workout_id,
            "sets": sets_data
        }
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