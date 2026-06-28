from flask import Flask
from flask_restful import Api, Resource
from extensions import db
from flask_migrate import Migrate

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

from models import User, Workout, Exercise, ExerciseSet

migrate = Migrate(app, db)

api = Api(app)

class Home(Resource):
    def get(self):
        return{"message": "Backend is running"}

class Users(Resource):
    def get(self):
        users = []
        data = User.query.all()
        for user in data:
            users.append(user.name)
        return{"message": users}

class SingleUser(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        user_workouts = []
        for workout in user.workouts:
            workout_data = {
                "workout_id": workout.id,
                "workout_type": workout.workout_type,
            }
            user_workouts.append(workout_data)
        return{"user": user.name, "workouts": user_workouts}

api.add_resource(Home, "/")
api.add_resource(Users, "/users")
api.add_resource(SingleUser, "/user/<int:id>")

if __name__ == "__main__":
    app.run(debug=True)