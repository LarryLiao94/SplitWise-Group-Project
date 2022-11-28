from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import Expense, Comment, db
from ..forms import CommentForm

expense_routes = Blueprint('expenses', __name__)

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
