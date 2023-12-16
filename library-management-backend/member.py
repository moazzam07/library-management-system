from flask import Blueprint, request, jsonify
from flask_restful import Api, Resource
from models import db, Member
from member_utils import validate_required_fields, create_member, get_all_members, update_member, delete_member, issue_book_to_member, return_book_by_member

member_bp = Blueprint('member', __name__)
api = Api(member_bp)

class MemberResource(Resource):
    def post(self):
        data = request.get_json()

        required_fields = ['name']
        validation_result = validate_required_fields(data, required_fields)
        if validation_result:
            return validation_result
        
        new_member = create_member(data)

        return {'message': 'Member Created Successfully', 'member_id': new_member.id}, 201
    
    def put(self, member_id):
        data = request.get_json()

        required_field = ['name']
        validation_result = validate_required_fields(data, required_field)
        if validation_result:
            return validation_result

        updated_member = update_member(member_id, data)

        return {'message': 'Member updated Successfully', 'member_id': updated_member.id}

    def delete(self, member_id):

        result = delete_member(member_id)

        return result

class MemberListResource(Resource):
    def get(self):
        members_data = get_all_members()
        return {'members': members_data}
 
class TransactionResource(Resource):
    def post(self, member_id):
        data = request.get_json()

        # Check if the request includes a 'book_id'
        if 'book_id' not in data:
            return {'message': 'Missing book_id in the request'}, 400

        book_id = data['book_id']

        # Check if the request includes a 'operation' indicating whether to issue or return
        if 'operation' not in data:
            return {'message': 'Missing operation in the request (issue/return)'}, 400

        operation = data['operation']

        if operation == 'issue':
            # Handle issuing a book
            result = issue_book_to_member(member_id, book_id)
            return result

        elif operation == 'return':
            # Handle returning a book
            result = return_book_by_member(member_id, book_id)
            return result

        else:
            return {'message': 'Invalid operation. Supported operations: issue/return'}, 400
        

api.add_resource(MemberResource, '/member', '/member/<int:member_id>')
api.add_resource(MemberListResource, '/member/list')
api.add_resource(TransactionResource, '/member/book/<int:member_id>')
    


