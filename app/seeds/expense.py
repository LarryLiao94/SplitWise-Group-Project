from app.models import db, environment, SCHEMA
from datetime import datetime
from app.models import Expense, Transaction

# Adds a demo user, you can add other users here if you want
def seed_expenses():
    test1 = Expense(
        transaction_user_id=1, user_id=1, recipientId=2, title='Gucci', timestamp=datetime.now(), description='Your balance has been paid',balance=1000, isSettled=False)
    test2 = Expense(
        transaction_user_id=2, user_id=2, recipientId=3, title='Shoes', timestamp=datetime.now(), description='Your balance has not been paid',balance=1000, isSettled=False)
    test3 = Expense(
        transaction_user_id=2, user_id=2, recipientId=1, title='massage', timestamp=datetime.now(), description='Your balance has not been paid',balance=1000, isSettled=False)
    test4 = Expense(
        transaction_user_id=2, user_id=2, recipientId=1, title='please', timestamp=datetime.now(), description='Your balance has not been paid',balance=1000, isSettled=False)
    test5 = Expense(
        transaction_user_id=2, user_id=2, recipientId=3, title='Starbucks', timestamp=datetime.now(), description='Your balance has not been paid',balance=1000, isSettled=False)
    test6 = Expense(
        transaction_user_id=3, user_id=3, recipientId=1, title='Coffee', timestamp=datetime.now(), description='Your balance has not been paid',balance=1000, isSettled=False)
    test7 = Expense(
        transaction_user_id=1, user_id=1, recipientId=3, title='Travel', timestamp=datetime.now(), description='Your balance has not been paid',balance=1000, isSettled=False)
    test8 = Expense(
        transaction_user_id=2, user_id=2, recipientId=3, title='test8', timestamp=datetime.now(), description='Your balance has not been paid',balance=1000, isSettled=False)
    test9 = Expense(
        transaction_user_id=1, user_id=1, recipientId=4, title='Gucci', timestamp=datetime.now(), description='Your balance has been paid',balance=425, isSettled=False)
    test10 = Expense(
        transaction_user_id=1, user_id=1, recipientId=5, title='Knicks Game', timestamp=datetime.now(), description='Your balance has not been paid',balance=1240, isSettled=False)
    test11 = Expense(
        transaction_user_id=1, user_id=1, recipientId=8, title='massage', timestamp=datetime.now(), description='Your balance has not been paid',balance=200, isSettled=False)
    test12 = Expense(
        transaction_user_id=8, user_id=6, recipientId=1, title='Stonks', timestamp=datetime.now(), description='Your balance has not been paid',balance=420, isSettled=False)
    test13 = Expense(
        transaction_user_id=4, user_id=7, recipientId=1, title='Stonks', timestamp=datetime.now(), description='Your balance has not been paid',balance=420, isSettled=False)
    test14 = Expense(
        transaction_user_id=8, user_id=8, recipientId=1, title='Fud', timestamp=datetime.now(), description='Your balance has not been paid',balance=420, isSettled=False)
    test15 = Expense(
        transaction_user_id=1, user_id=7, recipientId=1, title='Stonks', timestamp=datetime.now(), description='Your balance has not been paid',balance=420, isSettled=False)
    test16 = Expense(
        transaction_user_id=1, user_id=6, recipientId=1, title='Fud', timestamp=datetime.now(), description='Your balance has not been paid',balance=420, isSettled=False)

    db.session.add(test1)
    db.session.add(test2)
    db.session.add(test3)
    db.session.add(test4)
    db.session.add(test5)
    db.session.add(test6)
    db.session.add(test7)
    db.session.add(test8)
    db.session.add(test9)
    db.session.add(test10)
    db.session.add(test11)
    db.session.add(test12)
    db.session.add(test13)
    db.session.add(test14)
    db.session.add(test15)
    db.session.add(test16)
    # db.session.add(transaction1)
    # db.session.add(transaction2)
    # db.session.add_all()
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_expenses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.expenses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM expenses")

    db.session.commit()
