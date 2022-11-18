from .db import db

class Comment(db.Model):

  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  expenseId = db.Column(db.Integer, db.ForeignKey('expenses.id'))
  comment = db.Column(db.Text)

  #joined inheritance
  users = db.relationship('User', back_populates='comments')
  expenses = db.relationship("Expense", back_populates="comments")
