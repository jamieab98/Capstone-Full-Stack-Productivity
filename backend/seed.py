from app import app
from extensions import db
from models import User

with app.app_context():
    User.query.delete()

    u = User(name="Jamie")
    db.session.add(u)
    db.session.commit()