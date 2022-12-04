from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired

class AddFriendForm(FlaskForm):
    friendEE = IntegerField('Friend ID')
    description = StringField("Description", validators=[DataRequired()])
    submit = SubmitField()
