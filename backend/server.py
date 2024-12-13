from flask import Flask, jsonify
from flask_pymongo import PyMongo
from pymongo.errors import ConnectionFailure

# Initialize the Flask application
app = Flask(__name__)

# Load configuration from config.py
app.config.from_object('config.Config')

# Initialize PyMongo with the Flask app
mongo = PyMongo(app)

@app.route('/ping_db')
def ping_db():
    try:
        # The ping command checks the connection to the database
        mongo.cx.admin.command('ping')
        return jsonify({"status": "success", "message": "Database connection is healthy."}), 200
    except ConnectionFailure:
        return jsonify({"status": "fail", "message": "Database connection failed."}), 500

if __name__ == '__main__':
    app.run(debug=True)
