from flask import Blueprint, request
from flask_restful import Api, Resource
from models import db, Book
from book_utils import create_book, get_all_books, get_book_by_id, import_books, update_book, delete_book
from member_utils import validate_required_fields

# Create a Blueprint for books-related routes
books_bp = Blueprint('book', __name__)
api = Api(books_bp)

class BookResource(Resource):
    def post(self):
        """Create a new book record in the database."""
        data = request.get_json()

        # Validate required fields in the request data
        required_fields = ['bookID', 'title', 'authors', 'isbn', 'isbn13', 'stock']
        validation_result = validate_required_fields(data, required_fields)
        if validation_result:
            return validation_result

        # Create a new book using the provided data
        new_book = create_book(data)

        return {'message': 'Book Created Successfully', 'book_id': new_book.id}, 201
    
    def get(self, book_id):
        """Retrieve details for a specific book."""
        book_data = get_book_by_id(book_id)
        return {'book': book_data} 

    def put(self, book_id):
        """Update details for a specific book."""
        data = request.get_json()

        # Update the book details in the database
        update_book(book_id, data)
        return {'message': 'Book updated Successfully', 'book_id': book_id}

    def delete(self, book_id):
        """Delete a specific book."""
        result = delete_book(book_id)
        return result

class BookListResource(Resource):
    def get(self):
        """Retrieve a list of all books."""
        books_data = get_all_books()
        return {'books': books_data} 

class ImportResource(Resource):
    def post(self):
        data = request.get_json()
        print(data)
        api_url = 'https://frappe.io/api/method/frappe-library'
        # Check if data is None
        if data is not None and any(data.values()):
            # Initialize default values
            title = data.get('title', None)
            authors = data.get('authors', None)
            isbn = data.get('isbn', None)
            publisher = data.get('publisher', None)
            page = data.get('page', None)

            # Create a dictionary with non-None values
            params = {
                'title': title,
                'authors': authors,
                'isbn': isbn,
                'publisher': publisher,
                'page': page
            }
        else:
            # Handle the case when there is no request body
            params = {}

        result = import_books(api_url, params=params)
        return result
    
# Add resources and routes to the API
api.add_resource(BookResource, '/book', '/book/<int:book_id>')
api.add_resource(BookListResource, '/book/list')
api.add_resource(ImportResource, '/data-import')
