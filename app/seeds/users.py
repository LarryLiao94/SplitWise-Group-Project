from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', firstName='Demo1', lastName='LastDemo1', phoneNumber='1111111111', email='demo@aa.io', password='password', balance=0)
    marnie = User(
        username='marnie', firstName='Marnie', lastName='LastMarnie', phoneNumber='2222222222', email='marnie@aa.io', password='password', balance=0)
    bobbie = User(
        username='bobbie', firstName='Bobbie', lastName='LastBobbie', phoneNumber='3333333333', email='bobbie@aa.io', password='password', balance=0)
    xavier = User(
        username='xavier', firstName='Xavier', lastName='LastXavier', phoneNumber='4444444444', email='xavier@aa.io', password='password', balance=0)
    khad = User(
        username='khad', firstName='Khad', lastName='LastKhad', phoneNumber='5555555555', email='khad@aa.io', password='password', balance=0)
    
    
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(xavier)
    db.session.add(khad)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()