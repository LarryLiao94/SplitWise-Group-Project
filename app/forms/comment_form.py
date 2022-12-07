from flask_wtf import FlaskForm
from wtforms import (TextAreaField, IntegerField, SubmitField)
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    id = IntegerField('User ID')
    expenseId = IntegerField("Expense ID")
    comment = TextAreaField("Comment", validators=[DataRequired()])
