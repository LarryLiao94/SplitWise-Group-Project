from flask import Blueprint, render_template
from ..models import Friend

friends_bp = Blueprint('friends', __name__, url_prefix='/friends')

@friends_bp.route('/', method=['GET'])
def display_all_friends():
    friends = Friend.query.order_by(Friend.first_name).all()
    return render_template('friends.html', friends=friends)