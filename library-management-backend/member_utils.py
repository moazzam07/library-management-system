from models import db, Member, Book, Transaction
from flask import request
from datetime import datetime, timedelta

def validate_required_fields(data, required_fields):
    """Validate required fields in the incoming data."""
    if not all(field in data for field in required_fields):
        return {'message': 'Missing required fields'}, 400

def create_member(data):
    """Create a new Member instance and add it to the database."""
    new_member = Member(
        name=data['name'],
        outstanding_debt=data.get('outstanding_debt', 0.0)
    )
    db.session.add(new_member)
    db.session.commit()
    return new_member

def serialize_member(member):
    """Serialize a Member instance."""
    return {
        'id': member.id,
        'name': member.name,
        'outstanding_debt': member.outstanding_debt
    }

def get_all_members():
    """Retrieve all members from the database."""
    members = Member.query.all()
    return [serialize_member(member) for member in members]

def update_member(member_id, data):
    member = Member.query.get(member_id)

    if not member:
        return {'message': 'Member not found'}, 404
    
    if 'name' in data:
        member.name = data['name']
    
    if 'outstanding_debt' in data:
        member.outstanding_debt = data['outstanding_debt']

    db.session.commit()

    return member

def delete_member(member_id):
    member = Member.query.get(member_id)

    if not member:
        return {'message': 'Member not found'}, 404
    
    db.session.delete(member)
    db.session.commit()

    return {'message': 'Member deleted successfully'}

def issue_book_to_member(member_id, book_id):
    
    member = Member.query.get(member_id)
    book = Book.query.get(book_id)

    if not member or not book:
        return {'message': 'Member or Book not found'}, 404
    
    # Check if the member has outstanding debt
    if member.outstanding_debt > 500.0:
        return {'message': 'Member has outstanding dept exceeding Rs. 500. Cannot issue a book.'}, 400
    
    # Check if the book is in stock
    if book.stock <= 0:
        return {'message': 'Book is not in Stock'}, 400
    
    # Update book details and member's borrowed_books
    book.stock -= 1
    member.outstanding_debt += book.rent_fee
    new_transaction = Transaction(member_id=member.id, book_id=book.id, issue_date= datetime.now())
    db.session.add(new_transaction)
    db.session.commit()
    return {'message': 'Book issued successfully'}

def return_book_by_member(member_id, book_id):
    member = Member.query.get(member_id)
    book = Book.query.get(book_id)

    if not member or not book:
        return {'message': 'Member or Book not found'}, 404
    
    transaction = Transaction.query.filter_by(member_id=member.id, book_id=book.id).first()
    
    if not transaction:
        return {'message': 'Member did not borrow this book'}, 400
    
    # due_date = datetime.utcnow() - timedelta(days=14)

    book.stock += 1
    member.outstanding_debt -= book.rent_fee
    db.session.delete(transaction)
    db.session.commit()

    return {'message': 'Book returned successfully'}
