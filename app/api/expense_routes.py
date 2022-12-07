from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import Expense, Comment, User, db
from ..forms import CommentForm, ExpenseForm
from datetime import datetime

expense_routes = Blueprint('expenses', __name__)

@expense_routes.route('/')
@login_required
def get_all_expenses():
    userId = current_user.id
    expenses = Expense.query.filter(Expense.user_id == userId)
    return jsonify({'expenses': [expense.to_dict() for expense in expenses]})

@expense_routes.route('/<int:expenseId>')
@login_required
def get_expense(expenseId):
    expense = Expense.query.get(expenseId)
    return expense.to_dict()

@expense_routes.route('/<int:expenseId>', methods=["DELETE"])
@login_required
def delete_expense(expenseId):
    expense = Expense.query.get(expenseId)
    if (expense.user_id == current_user.id):
        db.session.delete(expense)
        db.session.commit()
        return f'Expense {expenseId} deleted'
    return 'Unauthorized'


@expense_routes.route('/<int:expenseId>', methods=["PUT"])
@login_required
def edit_expense(expenseId):
    form = ExpenseForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        expense = Expense.query.get(expenseId)
        # transaction = Transaction.query.get(expenseId)
        # print(expense)
        if expense.user_id == current_user.id:
            expense.title = form.description.data
            expense.description = form.description.data
            expense.timestamp = datetime.now()
            expense.balance = form.balance.data
            db.session.commit()
            return expense.to_dict()
        return "Unauthorized"
    return "Bad Data"


@expense_routes.route('/', methods=['POST'])
@login_required
def create_new_expense():
    form = ExpenseForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        fullName = form.recipientName.data.split(" ")
        firstName = fullName[0]
        lastName = fullName[1]
        recipient = User.query.filter(User.firstName == firstName and User.lastName == lastName)
        new_expense = Expense(
            user_id = current_user.id,
            transaction_user_id = current_user.id,
            recipientId = recipient[0].id,
            title = form.description.data,
            description = form.description.data,
            timestamp = datetime.now(),
            balance = form.balance.data,
        )
        db.session.add(new_expense)
        db.session.commit()
        return new_expense.to_dict()
    return "Bad Data"




@expense_routes.route('/<int:expenseId>/comments')
@login_required
def get_all_comments(expenseId):
    """
    Get all comments by expenseId
    """
    # comments = Comment.query.all()
    comments = Comment.query.filter(Comment.expenseId == expenseId)
    # return comments
    return jsonify({'comments': [comment.to_dict() for comment in comments]})

@expense_routes.route('/<int:expenseId>/comments',methods=["POST"])
@login_required
def post_new_comment(expenseId):
    print(expenseId)
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_comment = Comment(
            user_id = current_user.id,
            expenseId = expenseId,
            comment = form.comment.data,
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return "Bad Data"
