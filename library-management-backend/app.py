from flask import Flask
from models import db
from member import member_bp
from book import books_bp
from flask_cors import CORS

# Create a Flask application
app = Flask(__name__)

# Enable CORS for the entire app
CORS(app)

# Configure the SQLAlchemy database URI and track modifications
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///library.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database with the Flask app
db.init_app(app)

# Create all tables in the database
with app.app_context():
    db.create_all()

# Register blueprints for member and book routes
app.register_blueprint(member_bp, url_prefix='/api')
app.register_blueprint(books_bp, url_prefix='/api')

# Run the Flask app in debug mode if the script is executed directly
if __name__ == '__main__':
    app.run(debug=True)
