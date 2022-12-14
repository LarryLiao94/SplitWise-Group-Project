from flask_wtf import FlaskForm
from wtforms import (TextAreaField, IntegerField, StringField, SubmitField)
from wtforms.validators import DataRequired

class ExpenseForm(FlaskForm):
    id: IntegerField("Expense Id")
    recipientName = StringField('Name')
    description = StringField("Description", validators=[DataRequired()])
    balance = IntegerField("Balance")
