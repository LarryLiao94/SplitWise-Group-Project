from app.models import db, environment, SCHEMA
from datetime import datetime
from app.models import Expense, Transaction

# Adds a demo user, you can add other users here if you want
def seed_expenses():
    test1 = Expense(
        ownerId=1, userId=2, title='test1', timestamp=datetime.now(), description='Your balance has been paid',balance=100, isSettled=False)
    test2 = Expense(
        ownerId=2, userId=3, title='test2', timestamp=datetime.now(), description='Your balance has not been paid',balance=1000, isSettled=False)

    # transaction1 = Transaction(userId=2,description='Your balance has been paid', transactionableType='expense')
    # transaction2 = Transaction(userId=3,description='Your balance has not been paid', transactionableType='expense')

    db.session.add(test1)
    db.session.add(test2)
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
