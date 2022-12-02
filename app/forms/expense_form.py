from flask_wtf import FlaskForm
from wtforms import (TextAreaField, IntegerField, StringField, SubmitField)
from wtforms.validators import DataRequired

class ExpenseForm(FlaskForm):
    recipientId = IntegerField('User ID')
    description = StringField("Description", validators=[DataRequired()])
    balance = IntegerField("Balance")
