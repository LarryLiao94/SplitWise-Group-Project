from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Comment, db
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

# @comment_routes.route('/')
# @login_required
# def get_all_comments(expenseId):
#     """
#     get all comments
#     """
#     # comments = Comment.query.all()
#     comments = Comment.query.filter(Comment.expenseId == expenseId)
#     print(expenseId)
#     print(comments)
#     # return comments
#     return jsonify({'comments': [comment.to_dict() for comment in comments]})

@comment_routes.route('/<int:id>')
@login_required
def comment(id):
    comment = Comment.query.get(id)

    return comment.to_dict()

# @comment_routes.route('/<int: expenseId>', methods=["POST"])
# @login_required
# def add_comment(expenseId):

@comment_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_comment(id):
    comment_to_delete = Comment.query.get(id)
    if (comment_to_delete.userId == current_user.id):
        db.session.delete(comment_to_delete)
        db.session.commit()
        return f'Comment number {id} deleted'
    return 'Unauthorized'

@comment_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_comment(id):
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        comment_to_edit = Comment.query.get(id)
        if comment_to_edit.userId == current_user.id:
            comment_to_edit.comment = form.comment.data
            db.session.commit()
            return comment_to_edit.to_dict()
        return "Unauthorized"
    return "Bad Data"
