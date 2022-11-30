from app.models import db, Comment, environment, SCHEMA


def seed_comments():
    test1 = Comment(
        user_id = 1, expenseId = 1, comment = 'Payment received')
    test2 = Comment(
        user_id = 2, expenseId = 2, comment = 'Wheres my money?')

    db.session.add(test1)
    db.session.add(test2)

    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
