from flask_sqlalchemy import SQLAlchemy

# Create a SQLAlchemy instance
db = SQLAlchemy()

# Define the Book model
class Book(db.Model):
    """Model representing a book."""
    id = db.Column(db.Integer, primary_key=True)
    bookID = db.Column(db.String(255), unique=True, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    authors = db.Column(db.String(255), nullable=False)
    average_rating = db.Column(db.String(20))
    isbn = db.Column(db.String(20), unique=True, nullable=False)
    isbn13 = db.Column(db.String(20), unique=True, nullable=False)
    language_code = db.Column(db.String(5))
    num_pages = db.Column(db.String(20))
    ratings_count = db.Column(db.String(20))
    text_reviews_count = db.Column(db.String(10))
    publication_date = db.Column(db.String(12))
    publisher = db.Column(db.String(255))
    rent_fee = db.Column(db.Float, default=0.0)
    stock = db.Column(db.Integer, nullable=False)
    transactions = db.relationship('Transaction', back_populates='book', lazy='dynamic')

# Define the Member model
class Member(db.Model):
    """Model representing a library member."""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    outstanding_debt = db.Column(db.Float, default=0.0)
    borrowed_books = db.relationship('Transaction', back_populates='member', lazy='dynamic')

# Define the Transaction model
class Transaction(db.Model):
    """Model representing a transaction between a member and a book."""
    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    member_id = db.Column(db.Integer, db.ForeignKey('member.id'), nullable=False)
    issue_date = db.Column(db.Date, nullable=False)
    return_date = db.Column(db.Date)
    rent_fee = db.Column(db.Float, default=0.0)
    member = db.relationship('Member', back_populates='borrowed_books')
    book = db.relationship('Book', back_populates='transactions')
