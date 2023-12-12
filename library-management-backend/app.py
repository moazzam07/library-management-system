from flask import Flask, render_template
from models import db
from member import member_bp


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///library.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(member_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
