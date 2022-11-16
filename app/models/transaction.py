from .db import db
from sqlalchemy.orm import ( Mapped, mapped_column )
from .friend import *
# from .expense import *

class Transaction(db.Model):
    __tablename__='transactions'

    # id = db.Column(db.Integer, primary_key=True)
    # userId = db.Column(db.Integer, nullable=False)
    # description = db.Column(db.String)
    # transactionableId = db.Column(db.Integer)
    # transactionableType = db.Column(db.String)
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String)
    transactionableId = db.Column(db.Integer)
    transactionableType = db.Column(db.String)

    __mapper_args__ = {
      'polymorphic_identity': 'transaction',
      'polymorphic_on': 'type',
    }

    friends = db.relationship('Friend', back_populates='transactions')
    # expenses = db.relationship('Expense', back_popualtes='transactions')

    def to_dict(self):
        return {
            'id' : self.id,
            'userId' : self.userId,
            'description' : self.description,
            'transactionableId' : self.transactionableId,
            'transactionableType' : self.transactionableType
        }
   