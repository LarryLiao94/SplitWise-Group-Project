from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    """
            Relationships:
            One to Many: friends
            Many to Many: expenses
            One to Many: comments
    """
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    firstName = db.Column(db.String(20), nullable=False)
    lastName = db.Column(db.String(20), nullable=False)
    phoneNumber = db.Column(db.String(20))
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    balance = db.Column(db.Float, default=0)

    friends = db.relationship('Friend', primaryjoin="(User.id==Friend.user_id)" , back_populates='users')
    expenses = db.relationship('Expense', primaryjoin="(User.id==Expense.user_id)", back_populates='users')
    transactions = db.relationship('Transaction', primaryjoin="(User.id==Transaction.transaction_user_id)", back_populates='users')
    comments = db.relationship('Comment',back_populates='users')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'phoneNumber': self.phoneNumber,
            'username': self.username,
            'email': self.email,
            'balance': self.balance
        }
