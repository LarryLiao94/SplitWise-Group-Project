from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not (user):
        raise ValidationError('User does not exist')


class AddFriendForm(FlaskForm):
    email = StringField('Friend ID', validators=[DataRequired(), user_exists])
    description = StringField("Description", validators=[DataRequired()])
    # submit = SubmitField()
