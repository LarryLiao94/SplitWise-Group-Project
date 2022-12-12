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
    brian = User(
        username='brian', firstName='Brian', lastName='LastBrian', phoneNumber='6666666666', email='brian@aa.io', password='password', balance=0)
    dingus = User(
        username='dingus', firstName='Dingus', lastName='LastDingus', phoneNumber='7777777777', email='dingus@aa.io', password='password', balance=0)
    paolo = User(
        username='paolo', firstName='Paolo', lastName='LastPaolo', phoneNumber='8888888888', email='paolo@aa.io', password='password', balance=0)
    felicia = User(
        username='felicia', firstName='Felica', lastName='LastFelica', phoneNumber='9999999999', email='felicia@aa.io', password='password', balance=0)
    meg = User(
        username='meg', firstName='Meg', lastName='LastMeg', phoneNumber='1011011100', email='meg@aa.io', password='password', balance=0)
    tate = User(
        username='tate', firstName='Tate', lastName='LastTate', phoneNumber='2022022200', email='tate@aa.io', password='password', balance=0)
    
    
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(xavier)
    db.session.add(khad)
    db.session.add(brian)
    db.session.add(dingus)
    db.session.add(paolo)
    db.session.add(felicia)
    db.session.add(meg)
    db.session.add(tate)
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