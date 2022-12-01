from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Transaction

transaction_routes = Blueprint('transactions', __name__)

@transaction_routes.route('/')
@login_required
def get_all_transactions():
  userId = current_user.id 
  transactions = Transaction.query.filter(Transaction.transaction_user_id == userId)

  return jsonify({'transactions': [transaction.to_dict() for transaction in transactions]})
