from app.models import db, Friend, environment, SCHEMA

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

    db.session.add(friend1)
    db.session.add(friend2)
    db.session.add(friend3)
    db.session.add(friend4)
    db.session.add(friend5)
    db.session.add(friend6)
    db.session.add(friend7)
    db.session.add(friend8)
    db.session.add(friend9)
    db.session.commit()

def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friemds RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM friends")

    db.session.commit()