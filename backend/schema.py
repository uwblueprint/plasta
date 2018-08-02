# pylint: disable=W0622
# Reason: graphene requires built-in to be redefined for args to work
# pylint: disable=R0201
# Reason: method is used through client calls
# pylint: disable=W0613
# Reason: info must be included because of graphene
# pylint: disable=E1101
# Reason: scoped_session does have such members, not being detected for some reason
# pylint: disable=R0913
# Reason: graphene requires arguments to be formatted in that way

import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType
from database import db, Users as UsersModel

class CustomNode(relay.Node):
    '''
    Overrides the default relay node by returning ids as an integer instead of being Base64 encoded
    '''
    class Meta:
        name = 'Node'

    @staticmethod
    def to_global_id(type, id):
        return int(id)


class Users(SQLAlchemyObjectType):
    class Meta:
        model = UsersModel
        interfaces = (CustomNode, )

class CreateUser(graphene.Mutation):
    class Input:
        stakeholderId = graphene.Int()
        firstName = graphene.String()
        lastName = graphene.String()
        email = graphene.String()
        phoneNumber = graphene.String()
        password = graphene.String()

    ok = graphene.Boolean()
    user = graphene.Field(Users)

    def mutate(self, info, stakeholderId, firstName, lastName, email, phoneNumber, password):
        print(info)
        user = UsersModel(
            stakeholder_id=stakeholderId,
            first_name=firstName,
            last_name=lastName,
            email=email,
            phone_number=phoneNumber,
            password=password)
        db.session.add(user)
        db.session.commit()
        return CreateUser(user=user, ok=True)


class Query(graphene.ObjectType):
    node = CustomNode.Field()
    user = SQLAlchemyConnectionField(Users)
    find_user = graphene.Field(lambda: Users, id=graphene.Int())

    def resolve_find_user(self, info, id):
        return UsersModel.query.get(id)

class MyMutations(graphene.ObjectType):
    create_user = CreateUser.Field()

schema = graphene.Schema(query=Query, mutation=MyMutations, types=[Users])