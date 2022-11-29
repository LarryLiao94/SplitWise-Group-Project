from flask_wtf import FlaskForm
from wtforms import (TextAreaField, IntegerField, StringField, SubmitField)
from wtforms.validators import DataRequired

class ExpenseForm(FlaskForm):
    userId = IntegerField('User ID')
    title = StringField("Title")
    description = StringField("Description", validators=[DataRequired()])
    balance = IntegerField("Balance")
