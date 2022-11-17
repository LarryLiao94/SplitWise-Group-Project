# from .db import db

# class Friend(db.Model):
#     __tablename__='friends'

#     id = db.Column(db.Integer, primary_key=True)
#     friendER = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     friendEE = db.Column(db.Integer, nullable=False)
#     balance = db.Column(db.Integer, default=0)

#     # __mapper_args__ = {
# 	# 	'polymorphic_identity' : 'friends'
# 	# }

#     users = db.relationship('User', back_populates='friends')

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'friendER': self.friendER,
#             'friendEE': self.friendEE,
#             'balance': self.balance
#         }

#     def __repr__(self):
#         return f"<id:{self.id} friendER:{self.friendER} friendEE:{self.friendEE}>"


