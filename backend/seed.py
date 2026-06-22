from app import app
from extensions import db
from models import User, Workout, Exercise, ExerciseSet
from datetime import date

with app.app_context():
    User.query.delete()
    Workout.query.delete()
    Exercise.query.delete()
    ExerciseSet.query.delete()

    u1 = User(name="Jamie")

    w1 = Workout(workout_type="Leg Day", date=date(2026,6,20), user_id=1)

    e1 = Exercise(exercise_name="Squat", workout_id=1)

    es1 = ExerciseSet(reps=8, weight=135, unit="pounds", exercise_id=1)
    es2 = ExerciseSet(reps=7, weight=135, unit="pounds", exercise_id=1)
    es3 = ExerciseSet(reps=5, weight=135, unit="pounds", exercise_id=1)

    e2 = Exercise(exercise_name="Quad Extension", workout_id=1)

    es4 = ExerciseSet(reps=12, weight=80, unit="pounds", exercise_id=2)
    es5 = ExerciseSet(reps=12, weight=80, unit="pounds", exercise_id=2)
    es6 = ExerciseSet(reps=8, weight=90, unit="pounds", exercise_id=2)

    e3 = Exercise(exercise_name="Hamstring Curls", workout_id=1)

    es7 = ExerciseSet(reps=12, weight=80, unit="pounds", exercise_id=3)
    es8 = ExerciseSet(reps=11, weight=80, unit="pounds", exercise_id=3)
    es9 = ExerciseSet(reps=11, weight=80, unit="pounds", exercise_id=3)

    db.session.add_all([u1, w1, e1, es1, es2, es3, e2, es4, es5, es6, e3, es7, es8, es9])
    db.session.commit()