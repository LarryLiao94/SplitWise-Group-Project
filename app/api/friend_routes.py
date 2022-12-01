from flask import Blueprint, jsonify
from app.models import Friend, User, db
from flask_login import current_user, login_required

friend_routes = Blueprint('friends', __name__)



@friend_routes.route('/')
@login_required
def get_all_friends():
    """
    Get all friends
    """
    user = User.query.get(current_user.id)
    friends = Friend.query.filter(Friend.user_id == user.id).all()

    return jsonify({'friends': [User.query.get(friend.friendEE).firstName for friend in friends]})

# @friend_routes.route('/<int:id>')
# @login_required
# def add_a_friend(id):
#     id = int(id)
#     user = User.query.get(id)

# @friend_routes.route('/<int:id>')
# @login_required
# def get_friend_by_id(id):
#     user = User.query.get(id)
#     friend = Friend.query.filter(Friend.friendER == user.id)

#     if friend:
#         return friend.to_dict()
#     else:
#         return jsonify({'Not found': 'User does not exist or is not part of your friends list'}), 404
