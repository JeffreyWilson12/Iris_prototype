from flask import Flask
from flask_cors import CORS

from routes import camera_routes

app = Flask(__name__)

CORS(app)

app.register_blueprint(camera_routes)

if __name__ == "__main__":
    app.run(debug=True)