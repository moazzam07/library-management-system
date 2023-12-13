from models import db, Member
from flask import request

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
