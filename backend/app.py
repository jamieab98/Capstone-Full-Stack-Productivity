from flask import Flask
from flask_restful import Api, Resource
from extensions import db
from flask_migrate import Migrate
from models import User, Workout, Exercise, ExerciseSet

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATION"] = False

migrate = Migrate(app, db)

api = Api(app)

class Home(Resource):
    def get(self):
        return{"message": "Backend is running"}

api.add_resource(Home, "/")

if __name__ == "__main__":
    app.run(debug=True)