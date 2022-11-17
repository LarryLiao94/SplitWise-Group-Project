# from .db import db

# class Comment(db.Model):

#   __tablename__ = 'comments'

#   id = db.Column(db.Integer, primary_key=True)
#   userId = db.Column(db.Integer, db.ForeignKey('users.id'))
#   expenseId = db.Column(db.Integer, db.ForeignKey('transactions.expenses.id'))
#   comment = db.Column(db.Text)

#   #joined inheritance
#   user_comment = db.relationship('User',
#                   back_populates='comments')
