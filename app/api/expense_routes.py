from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import Expense, Comment, db
from ..forms import CommentForm, ExpenseForm
from datetime import datetime

expense_routes = Blueprint('expenses', __name__)

@expense_routes.route('/')
@login_required
def get_all_expenses():
    userId = current_user.id
    expenses = Expense.query.filter(Expense.ownerId == userId)
    return jsonify({'expenses': [expense.to_dict() for expense in expenses]})

@expense_routes.route('/<int:expenseId>')
@login_required
def get_expense(expenseId):
    expense = Expense.query.get(expenseId)
    return expense.to_dict()

@expense_routes.route('/<int:expenseId>', methods=["PUT"])
@login_required
def edit_expense(expenseId):
    form = ExpenseForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        expense = Expense.query.get(expenseId)
        # transaction = Transaction.query.get(expenseId)
        # print(expense)
        if expense.ownerId == current_user.id:
            print(expense)
            # expense.title = form.title.data,
            # expense.description = form.description.data,
            # expense.timestamp = datetime.now(),
            # expense.balance = form.balance.data
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
        new_expense = Expense(
            ownerId = current_user.id,
            userId = form.userId.data,
            title = form.title.data,
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
    print(expenseId)
    print(comments)
    # return comments
    return jsonify({'comments': [comment.to_dict() for comment in comments]})

@expense_routes.route('/<int:expenseId>/comments',methods=["POST"])
@login_required
def post_new_comment(expenseId):
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    print(expenseId)
    if form.validate_on_submit():
        new_comment = Comment(
            userId = current_user.id,
            expenseId = expenseId,
            comment = form.comment.data,
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return "Bad Data"
