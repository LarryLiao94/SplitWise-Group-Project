from .db import db

class Comment(db.Model):

  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  expenseId = db.Column(db.Integer, db.ForeignKey('expenses.id'))
  comment = db.Column(db.Text)


  users = db.relationship('User', back_populates='comments')
  expenses = db.relationship("Expense", back_populates="comments")


  def to_dict(self):
    return {
        'id': self.id,
        'userId': self.userId,
        'expenseId': self.expenseId,
        'comment': self.comment,
    }
