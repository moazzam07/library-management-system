from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.String(255), unique=True, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    authors = db.Column(db.String(255), nullable=False)
    average_rating = db.Column(db.Float)
    isbn = db.Column(db.String(20), unique=True, nullable=False)
    isbn13 = db.Column(db.String(20), unique=True, nullable=False)
    language_code = db.Column(db.String(5))
    num_pages = db.Column(db.Integer)
    ratings_count = db.Column(db.Integer)
    text_reviews_count = db.Column(db.Integer)
    publication_date = db.Column(db.Date)
    publisher = db.Column(db.String(255))
    rent_fee = db.Column(db.Float, default=0.0)
    stock = db.Column(db.Integer, nullable=False)

class Member(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    outstanding_debt = db.Column(db.Float, default=0.0)

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    member_id = db.Column(db.Integer, db.ForeignKey('member.id'), nullable=False)
    issue_date = db.Column(db.Date, nullable=False)
    return_date = db.Column(db.Date)
    rent_fee = db.Column(db.Float, default=0.0)
