from flask import Blueprint, request, jsonify
from flask_restful import Api, Resource
from models import db, Member
from member_utils import validate_required_fields, create_member, get_all_members, update_member, delete_member

member_bp = Blueprint('member', __name__)
api = Api(member_bp)

class MemberResource(Resource):
    def post(self):
        data = request.get_json()

        name = data["name"]
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

api.add_resource(MemberResource, '/member', '/member/<int:member_id>')
api.add_resource(MemberListResource, '/member/list')

    


