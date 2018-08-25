#!/usr/bin/env python

import sys
sys.path.append('..')

from pprint import pprint
import click
import bcrypt
from app.app import db
from app.models import User, Vendor, vendor_type_enum

table_choice = ('user', 'vendor')


@click.group()
def database():
    pass


@database.command()
@click.option('--table', type=click.Choice(table_choice), required=True)
def add(table):
    params = {}
    if table == 'user':
        params = {
            'vendor_id':
            click.prompt('Vendor ID', type=int),
            'email':
            click.prompt('Email'),
            'active':
            click.prompt('Active [y/N]', type=bool),
            'password_hash':
            bcrypt.hashpw(
                click.prompt(
                    'Password', hide_input=True, confirmation_prompt=True)
                .encode('utf8'), bcrypt.gensalt(14))
        }
        params = {
            param: value
            for param, value in params.items() if value != ''
        }
        new_object = User(**params)
    elif table == 'vendor':
        params = {
            'vendor_type':
            click.prompt(
                'Vendor Type',
                type=click.Choice(vendor_type_enum.enums)),
            'name':
            click.prompt('Name')
        }
        new_object = Vendor(**params)
    db.session.add(new_object)
    db.session.flush()
    print('Sucessfully created')
    pprint(new_object.__dict__)
    db.session.commit()


@database.command()
@click.option('--table', type=click.Choice(table_choice), required=True)
@click.option('--object_id', type=int, required=True)
def delete(table, object_id):
    table_types = {'user': User, 'vendor': Vendor}
    table = table_types[table]
    result = table.query.get(object_id)

    if not result:
        print(f'ERROR: could not find user with id = {object_id}')

    print('Found:')
    pprint(result.__dict__)

    if click.confirm('Do you want to delete this?'):
        db.session.delete(result)
        db.session.commit()


if __name__ == '__main__':
    database()
