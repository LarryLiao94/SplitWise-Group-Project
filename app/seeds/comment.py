# from app.models import db, Comment, environment, SCHEMA
# from datetime import datetime

# def seed_comments():
#     test1 = Comment(
#         userId = 1, expenseId = 1, comment = 'Payment received')
#     test2 = Comment(
#         userId = 2, expenseId = 2, comment = 'Wheres my money?')

#     db.session.add(test1)
#     db.session.add(test2)

#     db.session.commit()

# def undo_comments():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.expenses RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM comments")

#     db.session.commit()
