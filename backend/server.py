from flask import Flask, jsonify, request
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from config import Config
from flask_cors import CORS
from bson import ObjectId

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
    try:
        trainees = list(trainee_collection.find({}, {"_id": 1, "name": 1, "mobile": 1, "nic": 1, "email": 1, "address": 1, 
 "startDate": 1, "endDate": 1, "institute": 1, "languages": 1, 
 "specialization": 1, "supervisor": 1, "tdate": 1, "assignedWork": 1}
))  # Include all fields by default
        for trainee in trainees:
            trainee["_id"] = str(trainee["_id"])  # Convert ObjectId to string
        return jsonify(trainees), 200
    except Exception as e:
        return jsonify({"message": f"Error fetching trainees: {str(e)}"}), 500



@app.route('/trainees/<string:trainee_id>', methods=['GET'])
def get_trainee(trainee_id):
    """Get a trainee by ID."""
    try:
        trainee = trainee_collection.find_one({"_id": ObjectId(trainee_id)}, {"_id": 0})
        if not trainee:
            return jsonify({"message": "Trainee not found"}), 404
        return jsonify(trainee), 200
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500

# @app.route('/trainees/<string:trainee_id>', methods=['PUT'])
# def update_trainee(trainee_id):
#     """Update a trainee by ID."""
#     data = request.json
#     result = trainee_collection.update_one({"_id": trainee_id}, {"$set": data})
#     if result.matched_count == 0:
#         return jsonify({"message": "Trainee not found"}), 404
#     return jsonify({"message": "Trainee updated successfully"}), 200

@app.route('/trainees/<string:trainee_id>', methods=['PUT'])
def update_trainee(trainee_id):
    """Update a trainee by ID."""
    if not ObjectId.is_valid(trainee_id):  # Validate if trainee_id is a valid ObjectId
        return jsonify({"message": "Invalid trainee ID"}), 400

    try:
        data = request.json  # Get the update data from the request body
        result = trainee_collection.update_one({"_id": ObjectId(trainee_id)}, {"$set": data})
        if result.matched_count == 0:
            return jsonify({"message": "Trainee not found"}), 404
        return jsonify({"message": "Trainee updated successfully"}), 200
    except Exception as e:
        return jsonify({"message": f"Error updating trainee: {str(e)}"}), 500


@app.route('/trainees/<string:trainee_id>', methods=['DELETE'])
def delete_trainee(trainee_id):
    if not ObjectId.is_valid(trainee_id):  # Validate ObjectId
        return jsonify({"message": "Invalid trainee ID"}), 400
    try:
        result = trainee_collection.delete_one({"_id": ObjectId(trainee_id)})
        if result.deleted_count == 0:
            return jsonify({"message": "Trainee not found"}), 404
        return jsonify({"message": "Trainee deleted successfully"}), 200
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
