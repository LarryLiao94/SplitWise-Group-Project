from .db import db, environment, SCHEMA

class Expense(db.Model):
    """
            Relationships:
            One to Many: comments
            Many to Many: users(ownerId)
            Many to Many: users
    """
    __tablename__ = 'expenses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    userId = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(50), nullable=False)
    timestamp = db.Column(db.Date, nullable=False)
    balance = db.Column(db.Float, default=0)
    isSettled = db.Column(db.Boolean, default=False)

    # comments = db.relationship("Comment", back_populates="comments")
    users = db.relationship("User", back_populates="expenses")

    # @property
    # def balance(self):
    #     return self.balance

    # @balance.setter
    # def password(self, val):
    #     self.balance += val

    # def check_balance(self):
    #     return self.balance

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'userId': self.userId,
            'title': self.title,
            'timestamp': self.timestamp,
            'balance': self.balance,
            'isSettled': self.isSettled,
        }
