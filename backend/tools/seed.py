"""
A command line tool to create data for the database
"""

from pprint import pprint
import click
import bcrypt

from app import create_app
from app.models import db
from app.models.user import User
from app.models.vendor import Vendor, vendor_subtype_enum

TABLE_CHOICE = ('user', 'vendor', 'ps_user')

create_app()


@click.group()
def database():
    pass


@database.command()
@click.option('--table', '-t', type=click.Choice(TABLE_CHOICE), required=True)
def add(table):
    """Creates a new object in the database

    Parameters:
    table   Name of table to add object to
    """

    choices = {'user': _add_user, 'vendor': _add_vendor, 'ps_user': _add_ps_user}

    new_object = choices[table]()
    db.session.add(new_object)
    db.session.flush()
    print('Sucessfully created')
    pprint(new_object.to_dict())
    db.session.commit()


@database.command()
@click.option('--table', '-t', type=click.Choice(TABLE_CHOICE), required=True)
@click.option('--object_id', type=int, required=True)
def delete(table, object_id):
    """Deletes a object in the database

    Parameters:
    object_id   ID of object to delete
    table       Name of table to delete object from
    """

    table_types = {'user': User, 'vendor': Vendor}
    table = table_types[table]
    result = table.query.get(object_id)

    if not result:
        print(f'ERROR: could not find table with id = {object_id}')

    print('Found:')
    pprint(result.__dict__)

    if click.confirm('Do you want to delete this?'):
        db.session.delete(result)
        db.session.commit()


def _add_user():
    """Helper function for creating a user in the database"""

    params = {
        'vendor_id': click.prompt('Vendor ID', type=int),
        'email': click.prompt('Email'),
        'active': click.prompt('Active [y/N]', type=bool),
        'password': click.prompt(
                'Password', hide_input=True,
                confirmation_prompt=True)
    }
    params = {param: value for param, value in params.items() if value != ''}
    return User.create(**params)


def _add_vendor():
    """Helper function for creating a vendor in the database"""

    params = {
        'vendor_subtype': click.prompt(
            'Vendor Subtype', type=click.Choice(vendor_subtype_enum.enums)),
        'name': click.prompt('Name')
    }
    return Vendor.create(**params)

def _add_ps_user():
    """Helper function for creating a primary segregator user in the database"""

    vendor_params = {
        'vendor_subtype': 'primary_segregator',
        'name': click.prompt('Name')
    }
    new_vendor = Vendor.create(**vendor_params)

    user_params = {
        'vendor_id': new_vendor.id,
        'email': click.prompt('Email'),
        'active': click.prompt('Active [y/n]', type=bool),
        'password': click.prompt(
                'Password', hide_input=True,
                confirmation_prompt=True)
    }
    user_params = {param: value for param, value in user_params.items() if value != ''}
    return User.create(**user_params)


if __name__ == '__main__':
    database()
