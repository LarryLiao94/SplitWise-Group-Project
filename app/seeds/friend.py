from app.models import db, environment, SCHEMA
from app.models import Friend, Transaction

def seed_friends():
    friend1 = Friend(
        friendER=1, friendEE=2
    )
    friend2 = Friend(
        friendER=1, friendEE=3
    )
    friend3 = Friend(
        friendER=1, friendEE=4
    )
    friend4 = Friend(
        friendER=1, friendEE=5
    )
    friend5 = Friend(
        friendER=2, friendEE=3
    )
    friend6 = Friend(
        friendER=2, friendEE=4
    )
    friend7 = Friend(
        friendER=2, friendEE=5
    )
    friend8 = Friend(
        friendER=3, friendEE=4
    )
    friend9 = Friend(
        friendER=3, friendEE=5
    )
    transaction1 = Transaction(userId=1,description='added friend 2', transactionableType='friend')
    transaction2 = Transaction(userId=1,description='added friend 3', transactionableType='friend')
    transaction3 = Transaction(userId=1,description='added friend 4', transactionableType='friend')
    transaction4 = Transaction(userId=1,description='added friend 5', transactionableType='friend')
    transaction5 = Transaction(userId=2,description='added friend 3', transactionableType='friend')
    transaction6 = Transaction(userId=2,description='added friend 4', transactionableType='friend')
    transaction7 = Transaction(userId=2,description='added friend 5', transactionableType='friend')
    transaction8 = Transaction(userId=3,description='added friend 4', transactionableType='friend')
    transaction9 = Transaction(userId=3,description='added friend 5', transactionableType='friend')

    db.session.add(friend1)
    db.session.add(friend2)
    db.session.add(friend3)
    db.session.add(friend4)
    db.session.add(friend5)
    db.session.add(friend6)
    db.session.add(friend7)
    db.session.add(friend8)
    db.session.add(friend9)
    db.session.add(transaction1)
    db.session.add(transaction2)
    db.session.add(transaction3)
    db.session.add(transaction4)
    db.session.add(transaction5)
    db.session.add(transaction6)
    db.session.add(transaction7)
    db.session.add(transaction8)
    db.session.add(transaction9)

    # db.session.add_all()
    db.session.commit()

def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friemds RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM friends")

    db.session.commit()