import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.server_api import ServerApi

# Load environment variables from .env file
load_dotenv()

class Config:
    # Retrieve the MongoDB URI from environment variables
    MONGO_URI = os.getenv('MONGO_URI')

# Initialize the MongoDB client using the URI from the Config class
client = MongoClient(Config.MONGO_URI, server_api=ServerApi('1'))

# Test the connection
try:
    client.admin.command('ping')
    print("You successfully connected to MongoDB!")
except Exception as e:
    print(f"An error occurred: {e}")
