from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Transaction, User

transaction_routes = Blueprint('transactions', __name__)

@transaction_routes.route('/')
@login_required
def get_all_transactions():
  # userId = current_user.id 
  # transactions = Transaction.query.filter(Transaction.transaction_user_id == userId)

  # return jsonify({'transactions': [transaction.to_dict() for transaction in transactions]})
  user = User.query.get(current_user.id)
  transactions = Transaction.query.filter(Transaction.transaction_user_id == current_user.id)
  transaction_query = [Transaction.query.get(transaction.id) for transaction in transactions]
  
  all_transactions = {}

  for transaction in transaction_query:
      if transaction:
          all_transactions[transaction.id] = {
              'transactionId': transaction.id,
              'userId': transaction.transaction_user_id,
              # 'recipientId': transaction.recipientId,
              'ownerName': User.query.get(transaction.transaction_user_id,).firstName,
              # 'recipientName': User.query.get(expense.recipientId).firstName,
              'description': transaction.description,
              # 'timestamp': expense.timestamp,
              # 'balance': expense.balance,
              'type': 'owner'
          }
  for transaction in transactions:
      if transaction:
         all_transactions[transaction.id] = {
              'transactionId': transaction.id,
              'userId': transaction.transaction_user_id,
              # 'recipientId': transaction.recipientId,
              'ownerName': User.query.get(transaction.transaction_user_id,).firstName,
              # 'recipientName': User.query.get(expense.recipientId).firstName,
              'description': transaction.description,
              'type': 'recipient'
          }
  
  return jsonify({
      # 'balance': user.balance,
      'transactions': all_transactions
  })