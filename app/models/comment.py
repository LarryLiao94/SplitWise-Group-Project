from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):

  __tablename__ = 'comments'
  
  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  expenseId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('expenses.id')))
  comment = db.Column(db.Text)


  users = db.relationship('User', back_populates='comments')
  expenses = db.relationship("Expense", back_populates="comments")


  def to_dict(self):
    return {
        'id': self.id,
        'userId': self.user_id,
        'expenseId': self.expenseId,
        'comment': self.comment,
    }
