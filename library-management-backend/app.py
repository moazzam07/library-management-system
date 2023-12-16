from flask import Flask, render_template, jsonify, request
from models import db
from member import member_bp
from book import books_bp
from flask_cors import CORS
import requests


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///library.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(member_bp, url_prefix='/api')
app.register_blueprint(books_bp, url_prefix='/api')

@app.route('/data-import', methods=["POST"])
def dataImport():
    data = request.get_json()
    api_url = 'https://frappe.io/api/method/frappe-library'
    try:
        # Make a GET request to the Frappe API
        if 'numberOfBooks' in data:
            numberOfBooks = data['numberOfBooks']
        if data['title']:
            title = data['title']

        params = {
            'title': title,
            # 'param2': request.args.get('param2'),
            # Add more parameters as needed
        }  

        response = requests.get(api_url, params=params)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the JSON response and return it
            data = response.json()
            return jsonify(data)
        else:
            # If the request was not successful, return an error message
            return jsonify({'error': f'Request to {api_url} failed with status code {response.status_code}'})

    except Exception as e:
        # Handle any exceptions that may occur during the request
        return jsonify({'error': f'Error during request: {str(e)}'})

if __name__ == '__main__':
    app.run(debug=True)
