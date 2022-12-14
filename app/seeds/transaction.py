# from app.models import db, environment, SCHEMA
# from datetime import datetime
# from app.models import Transaction

# # Adds a demo user, you can add other users here if you want
# def seed_transaction():
#     test1 = Transaction(
#         userId=1, description='test', transactionableId=1, transactionableType='friends')


#     db.session.add(test1)

#     db.session.commit()


# # Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# # have a built in function to do this. With postgres in production TRUNCATE
# # removes all the data from the table, and RESET IDENTITY resets the auto
# # incrementing primary key, CASCADE deletes any dependent entities.  With
# # sqlite3 in development you need to instead use DELETE to remove all data and
# # it will reset the primary keys for you as well.
# def undo_transaction():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.expenses RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM expenses")

#     db.session.commit()
