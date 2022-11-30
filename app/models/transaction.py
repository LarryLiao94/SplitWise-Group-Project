from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .friend import *
# from .expense import *

class Transaction(db.Model):
    __tablename__='transactions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    description = db.Column(db.String)
    # transactionableId = db.Column(db.Integer)
    transactionableType = db.Column(db.String)

    __mapper_args__ = {
      'polymorphic_identity' : 'transactions',
      #discriminator
      "polymorphic_on" : transactionableType
    }

    # friends = db.relationship('Friend', back_populates='transactions')
    # expenses = db.relationship('Expense', back_populates='transactions')

    users = db.relationship('User', back_populates='transactions')

    def to_dict(self):
        return {
            'id' : self.id,
            'userId' : self.user_id,
            'description' : self.description,
            # 'transactionableId' : self.transactionableId,
            'transactionableType' : self.transactionableType
        }

class Friend(Transaction):
    __tablename__='friends'

    id = db.Column(db.Integer, db.ForeignKey('transactions.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    friendEE = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    balance = db.Column(db.Integer, default=0)

    __mapper_args__ = {
		'polymorphic_identity' : 'friends'
	}
    # users = db.relationship('User', foreign_keys='[Friend.friendER, Friend.friendEE]', back_populates='friends')

class Expense(Transaction):
  """
          Relationships:
          One to Many: comments
          Many to Many: users(ownerId)
          Many to Many: users
  """
  __tablename__ = 'expenses'

  id = db.Column(db.Integer, db.ForeignKey('transactions.id'), primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  recipientId = db.Column(db.Integer, nullable=False)
  title = db.Column(db.String(50), nullable=False)
  timestamp = db.Column(db.Date, nullable=False)
  balance = db.Column(db.Float, default=0)
  isSettled = db.Column(db.Boolean, default=False)

  __mapper_args__ = {
      'polymorphic_identity' : 'expenses'
  }
  comments = db.relationship("Comment",back_populates='expenses')

  # comments = db.relationship("Comment", back_populates="comments")
  # users = db.relationship("User", back_populates="expenses")
