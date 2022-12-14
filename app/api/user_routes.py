from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Transaction, Friend, Expense

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return jsonify({'users': [user.to_dict() for user in users]})


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/account/settings')
@login_required
def get_me():
    user = User.query.get(current_user.get_id())
    return user.to_dict()

@user_routes.route('/balance')
@login_required
def get_balance():
    user = User.query.get(current_user.id)
    transactions = Transaction.query.filter(Transaction.transaction_user_id == current_user.id)
    expense_transactions = [Expense.query.get(transaction.id) for transaction in transactions if transaction.transactionableType == "expenses"]
    # expense_query = [Expense.query.get(transaction.id) for transaction in transactions]

    # owner of expense
    balances = [expense.balance for expense in user.expenses]
    positive_balance = 0
    for balance in balances:
        positive_balance += balance / 2
    user.balance += positive_balance
    # print(positive_balance)

    #recipient of expense
    expenses = Expense.query.filter(Expense.recipientId == current_user.id).all()
    owe_balance = [expense.balance for expense in expenses]

    negative_balance = 0
    for balance in owe_balance:
        negative_balance += balance / 2

    user.balance -= negative_balance
    # print(negative_balance)

    return jsonify({
        'balance': user.balance,
        'owed': positive_balance,
        'owe': negative_balance
    })

@user_routes.route('/expenses')
@login_required
def get_expenses():
    user = User.query.get(current_user.id)
    transactions = Transaction.query.filter(Transaction.transaction_user_id == current_user.id)
    expense_query = [Expense.query.get(transaction.id) for transaction in transactions]


    # owner of expense
    balances = [expense.balance for expense in user.expenses]
    positive_balance = 0
    for balance in balances:
        positive_balance += balance / 2
    user.balance += positive_balance
    # print(positive_balance)

    #recipient of expense
    expenses = Expense.query.filter(Expense.recipientId == current_user.id).all()
    owe_balance = [expense.balance for expense in expenses]

    negative_balance = 0
    for balance in owe_balance:
        negative_balance += balance / 2

    user.balance -= negative_balance
    # print(negative_balance)

    all_expenses = {}

    for expense in expense_query:
        if expense:
            all_expenses[expense.id] = {
                'expenseId': expense.id,
                'userId': expense.user_id,
                'recipientId': expense.recipientId,
                'ownerName': User.query.get(expense.user_id).firstName,
                'recipientName': User.query.get(expense.recipientId).firstName,
                'title': expense.title,
                'timestamp': expense.timestamp,
                'balance': expense.balance,
                'type': 'owner'
            }
    for expense in expenses:
        if expense:
            all_expenses[expense.id] = {
                'expenseId': expense.id,
                'userId': expense.user_id,
                'recipientId': expense.recipientId,
                'ownerName': User.query.get(expense.user_id).firstName,
                'recipientName': User.query.get(expense.recipientId).firstName,
                'title': expense.title,
                'timestamp': expense.timestamp,
                'balance': expense.balance,
                'type': 'recipient'
            }

    # print(all_expenses)
    
    return jsonify({
        'balance': user.balance,
        'expenses': all_expenses
    })