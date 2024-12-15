# from flask import Flask, jsonify
# from flask_pymongo import PyMongo
# from pymongo.errors import ConnectionFailure

# # Initialize the Flask application
# app = Flask(__name__)

# # Load configuration from config.py
# app.config.from_object('config.Config')

# # Initialize PyMongo with the Flask app
# mongo = PyMongo(app)

# @app.route('/ping_db')
# def ping_db():
#     try:
#         # The ping command checks the connection to the database
#         mongo.cx.admin.command('ping')
#         return jsonify({"status": "success", "message": "Database connection is healthy."}), 200
#     except ConnectionFailure:
#         return jsonify({"status": "fail", "message": "Database connection failed."}), 500

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, jsonify, request
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from config import Config
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app) 

# Initialize the MongoDB client
def init_db():
    """
    Initializes and returns the MongoDB client.
    """
    try:
        client = MongoClient(Config.MONGO_URI)
        client.admin.command('ping')  # Test connection
        print("Database connection is healthy.")
        return client
    except ConnectionFailure as e:
        print(f"Database connection failed: {e}")
        raise

mongo_client = init_db()
db = mongo_client["intern_db"]  # Use the database `intern_db`
trainee_collection = db["trainees"]  # Collection for trainees

@app.route('/trainees', methods=['POST'])
def create_trainee():
    """Create a new trainee."""
    data = request.json
    result = trainee_collection.insert_one(data)
    return jsonify({"message": "Trainee created successfully", "id": str(result.inserted_id)}), 201

@app.route('/trainees', methods=['GET'])
def get_all_trainees():
    """Get all trainees."""
    trainees = list(trainee_collection.find({}, {"_id": 0}))  # Exclude MongoDB `_id` in response
    return jsonify(trainees), 200

@app.route('/trainees/<string:trainee_id>', methods=['GET'])
def get_trainee(trainee_id):
    """Get a trainee by ID."""
    trainee = trainee_collection.find_one({"_id": trainee_id}, {"_id": 0})
    if not trainee:
        return jsonify({"message": "Trainee not found"}), 404
    return jsonify(trainee), 200

@app.route('/trainees/<string:trainee_id>', methods=['PUT'])
def update_trainee(trainee_id):
    """Update a trainee by ID."""
    data = request.json
    result = trainee_collection.update_one({"_id": trainee_id}, {"$set": data})
    if result.matched_count == 0:
        return jsonify({"message": "Trainee not found"}), 404
    return jsonify({"message": "Trainee updated successfully"}), 200

@app.route('/trainees/<string:trainee_id>', methods=['DELETE'])
def delete_trainee(trainee_id):
    """Delete a trainee by ID."""
    result = trainee_collection.delete_one({"_id": trainee_id})
    if result.deleted_count == 0:
        return jsonify({"message": "Trainee not found"}), 404
    return jsonify({"message": "Trainee deleted successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)
