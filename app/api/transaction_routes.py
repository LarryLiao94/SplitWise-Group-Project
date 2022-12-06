from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Transaction, User, Expense, Friend

transaction_routes = Blueprint('transactions', __name__)

@transaction_routes.route('/')
@login_required
def get_all_transactions():
  # userId = current_user.id 
  # transactions = Transaction.query.filter(Transaction.transaction_user_id == userId)

  # return jsonify({'transactions': [transaction.to_dict() for transaction in transactions]})
  user = User.query.get(current_user.id)
  owner_friends = Friend.query.filter(Friend.user_id == current_user.id)
  owner_expenses = Expense.query.filter(Expense.user_id == current_user.id) 
  friends = Friend.query.filter(Friend.friendEE == current_user.id)
  expenses = Expense.query.filter(Expense.recipientId == current_user.id)
  
  all_transactions = {}

  for friend in owner_friends:
    if friend:
         all_transactions[friend.id] = {
              'transactionId': friend.id,
              'userId': friend.user_id,
              'friendEE': friend.friendEE,
              'ownerName': User.query.get(friend.user_id,).firstName,
              'recipientName': User.query.get(friend.friendEE).firstName,
              'description': friend.description,
              'type': 'owner',
              'transactionType': 'friend'
          }
  for expense in owner_expenses:
    if expense:
         all_transactions[expense.id] = {
              'transactionId': expense.id,
              'userId': expense.user_id,
              'recipientId': expense.recipientId,
              'ownerName': User.query.get(expense.user_id).firstName,
              'recipientName': User.query.get(expense.recipientId).firstName,
              'description': expense.title,
              'balance': expense.balance,
              'type': 'owner',
              'transactionType': 'expense'
          }
  for friend in friends:
    if friend:
         all_transactions[friend.id] = {
              'transactionId': friend.id,
              'userId': friend.user_id,
              'friendEE': friend.friendEE,
              'ownerName': User.query.get(friend.user_id,).firstName,
              'recipientName': User.query.get(friend.friendEE).firstName,
              'description': friend.description,
              'type': 'recipient',
              'transactionType': 'friend'
          }
  for expense in expenses:
    if expense:
         all_transactions[expense.id] = {
              'transactionId': expense.id,
              'userId': expense.user_id,
              'recipientId': expense.recipientId,
              'ownerName': User.query.get(expense.user_id).firstName,
              'recipientName': User.query.get(expense.recipientId).firstName,
              'description': expense.title,
              'balance': expense.balance,
              'type': 'recipient',
              'transactionType': 'expense'
          }
 

  
  return jsonify({
      # 'balance': user.balance,
      'transactions': all_transactions
  })