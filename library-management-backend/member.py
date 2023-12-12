from flask import Blueprint, request, jsonify
from flask_restful import Api, Resource
from models import db, Member

member_bp = Blueprint('member', __name__)
api = Api(member_bp)

class MemberResource(Resource):
    def post(self):
        data = request.get_json()

        name = data["name"]
        required_fields = ['name']
        if not all(field in data for field in required_fields):
            return {'message': 'Missing required fields'}, 400
        
        new_member = Member(
            name = name,
            outstanding_debt = data.get('outstanding_debt', 0.0)
        )

        db.session.add(new_member)
        db.session.commit()

        return {'message': 'Member Created Successfully', 'member_id': new_member.id}, 201
    
class MemberListResource(Resource):
    def get(self):
        members = Member.query.all()

        members_data = [
            {
                'id': member.id,
                'name': member.name,
                'outstanding_debt': member.outstanding_debt
            }
            for member in members
        ]

        return {'members': members_data}
    

api.add_resource(MemberResource, '/member')
api.add_resource(MemberListResource, '/member/list')

    


