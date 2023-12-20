from models import db, Book
from flask import jsonify
import requests

def create_book(data):
    """Create a new Book instance and add it to the database."""
    new_book = Book(
        bookID=data['bookID'],
        title=data['title'],
        authors=data['authors'],
        average_rating=data.get('average_rating'),
        isbn=data['isbn'],
        isbn13=data['isbn13'],
        language_code=data.get('language_code'),
        num_pages=data.get('num_pages'),
        ratings_count=data.get('ratings_count'),
        text_reviews_count=data.get('text_reviews_count'),
        publication_date=data.get('publication_date'),
        publisher=data.get('publisher'),
        rent_fee=data.get('rent_fee', 0.0),
        stock=data['stock']
    )
    db.session.add(new_book)
    db.session.commit()
    return new_book

def get_all_books():
    """Retrieve all books from the database."""
    books = Book.query.all()
    return [serialize_book(book) for book in books]

def get_book_by_id(book_id):
    """Retrieve a book by its ID."""
    book = Book.query.get(book_id)
    if not book:
        return {'message': 'Book not found'}, 404
    return serialize_book(book)

def update_book(book_id, data):
    """Update a Book's information."""
    book = Book.query.get(book_id)

    if not book:
        return {'message': 'Book not found'}, 404

    # Update fields if present in the data
    for key, value in data.items():
        setattr(book, key, value)

    db.session.commit()
    return serialize_book(book)

def delete_book(book_id):
    """Delete a Book by its ID."""
    book = Book.query.get(book_id)

    if not book:
        return {'message': 'Book not found'}, 404

    db.session.delete(book)
    db.session.commit()
    return {'message': 'Book deleted successfully'}

def serialize_book(book):
    """Serialize a Book instance."""
    return {
        'id': book.id,
        'bookID': book.bookID,
        'title': book.title,
        'authors': book.authors,
        'average_rating': book.average_rating,
        'isbn': book.isbn,
        'isbn13': book.isbn13,
        'language_code': book.language_code,
        'num_pages': book.num_pages,
        'ratings_count': book.ratings_count,
        'text_reviews_count': book.text_reviews_count,
        'publication_date': str(book.publication_date),
        'publisher': book.publisher,
        'rent_fee': book.rent_fee,
        'stock': book.stock
    }

def import_books(api_url, params):

    response = requests.get(api_url, params=params)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Parse the JSON response and return it
        data = response.json()
        return jsonify(data)
    else:
        # If the request was not successful, return an error message
        return jsonify({'error': f'Request to {api_url} failed with status code {response.status_code}'})