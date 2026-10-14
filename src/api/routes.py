from flask import request, jsonify, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    return jsonify({"message": "Hello! I'm a message that came from the backend"}), 200

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    if not body or not body.get("email") or not body.get("password"):
        return jsonify({"msg": "Email and password required"}), 400
    if User.query.filter_by(email=body["email"]).first():
        return jsonify({"msg": "User already exists"}), 400
    user = User(email=body["email"], password=body["password"], is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User created"}), 201

@api.route('/token', methods=['POST'])
def login():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")
    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"msg": "Bad email or password"}), 401
    token = create_access_token(identity=str(user.id))
    return jsonify({"token": token}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))
    if not user:
        return jsonify({"msg": "User not found"}), 404
    return jsonify({"msg": "OK", "user": user.serialize()}), 200