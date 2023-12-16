from flask import Blueprint, request, jsonify
from flask_restful import Api, Resource
from models import db, Book
from book_utils import create_book, get_all_books, get_book_by_id, update_book, delete_book
from member_utils import validate_required_fields

books_bp = Blueprint('book', __name__)
api = Api(books_bp)

class BookResource(Resource):
    def post(self):
        data = request.get_json()
        print(data)
        required_fields = ['bookID', 'title', 'authors', 'isbn', 'isbn13', 'stock']
        validation_result = validate_required_fields(data, required_fields)
        if validation_result:
            return validation_result
        
        new_book = create_book(data)

        return {'message': 'Book Created Successfully', 'book': new_book.id}, 201
    
    def get(self, book_id):
        book_data = get_book_by_id(book_id)
        return {'book': book_data} 

    def put(self, book_id):
        data = request.get_json()

        updated_book = update_book(book_id, data)

        return {'message': 'Book updated Successfully', 'book_id': updated_book.id}

    def delete(self, book_id):
        result = delete_book(book_id)
        return result

class BookListResource(Resource):
    def get(self):
        books_data = get_all_books()
        return {'books': books_data} 

api.add_resource(BookResource, '/book', '/book/<int:book_id>')
api.add_resource(BookListResource, '/book/list')

    


