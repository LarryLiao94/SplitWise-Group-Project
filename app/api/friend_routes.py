from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Friend, User, Expense, Transaction, db
from ..forms import AddFriendForm

friend_routes = Blueprint('friends', __name__)


@friend_routes.route('/')
# @login_required
def get_all_friends():
    """
    Get all friends
    """
    user = User.query.get(current_user.id)
    friends = Friend.query.filter(Friend.user_id == user.id).all()
    return jsonify({'friends': [User.query.get(friend.friendEE).firstName + " " + User.query.get(friend.friendEE).lastName + " " for friend in friends]}) 

@friend_routes.route('/<int:id>')
@login_required
def get_friend_by_id(id):
    user = User.query.get(current_user.id)
    friends = Friend.query.filter(Friend.user_id == user.id).all()
    friend_id = 0

    for friend in friends:
        if friend.friendEE == id:
            friend_id = friend.friendEE
    
    user_friend = User.query.get(friend_id)
    details = {}

    expenses = Expense.query.filter(Expense.user_id == current_user.id).all()
    recipient_expenses = Expense.query.filter(Expense.recipientId == current_user.id).all()
    for expense in expenses:
        if expense.recipientId == id:
            details[f"{expense.id}"] = {
                'transactionId': expense.id,
                'userId': expense.user_id,
                'recipientId': expense.recipientId,
                'ownerName': User.query.get(expense.user_id).firstName,
                'recipientName': User.query.get(expense.recipientId).firstName,
                'description': expense.title,
                'balance': expense.balance,
                'type': 'owner'       
            }
    for expense in recipient_expenses:
        if expense.user_id == id:
            details[f"{expense.id}"] = {
                'transactionId': expense.id,
                'userId': expense.user_id,
                'recipientId': expense.recipientId,
                'ownerName': User.query.get(expense.user_id).firstName,
                'recipientName': User.query.get(expense.recipientId).firstName,
                'description': expense.title,
                'balance': expense.balance,
                'type': 'recipient'       
            }

    details['firstName'] = user_friend.firstName
    details['lastName'] = user_friend.lastName
    details['id'] = user_friend.id


    if user_friend:
        return details
    else:
        return jsonify({'Not found': 'User does not exist or is not part of your friends list'}), 404


@friend_routes.route('/', methods=['POST'])
@login_required
def add_friend():
    form = AddFriendForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_friend = Friend(
            user_id = current_user.id,
            transaction_user_id = current_user.id,
            friendEE = User.query.filter(User.email == form.email.data)[0].id,
            # friendEE = 3,
            description = form.description.data
        )
        db.session.add(new_friend)
        db.session.commit()
        return new_friend.to_dict()
    return "Bad Data"
