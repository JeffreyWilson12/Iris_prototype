from flask import Blueprint
from flask import Response

from camera import generate_frames

camera_routes = Blueprint("camera", __name__)


@camera_routes.route("/video")

def video():

    return Response(

        generate_frames(),

        mimetype="multipart/x-mixed-replace; boundary=frame"

    )