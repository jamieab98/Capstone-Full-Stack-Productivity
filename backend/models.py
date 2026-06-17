from app import db

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    workouts = db.relationship("Workout", backref="user")

class Workout(db.Model):
    __tablename__ = "workouts"
    id = db.Column(db.Integer, primary_key=True)
    workout_type = db.Column(db.String)
    date = db.Column(db.Date)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    exercises = db.relationship("Exercise", backref="workout")

class Exercise(db.Model):
    __tablename__ = "exercises"
    id = db.Column(db.Integer, primary_key=True)
    exercise_name = db.Column(db.String)
    workout_id = db.Column(db.Integer, db.ForeignKey("workouts.id"))
    exercise_sets = db.relationship("ExerciseSet", backref="exercise")

class ExerciseSet(db.Model):
    __tablename__ = "exercise_sets"
    id = db.Column(db.Integer, primary_key=True)
    reps = db.Column(db.Integer)
    weight = db.Column(db.Integer)
    time = db.Column(db.Integer)
    unit = db.Column(db.String)
    exercise_id = db.Column(db.Integer, db.ForeignKey("exercises.id"))