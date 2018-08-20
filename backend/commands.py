from pprint import pprint
import click
import bcrypt
from app.app import db
from app import models


@click.group()
def database():
    pass


@database.command()
@click.option('--table', type=click.Choice(['user', 'vendor']), required=True)
def add(table):
    params = {}
    if table == 'user':
        params['vendor_id'] = click.prompt('Vendor ID', type=int)
        params['email'] = click.prompt('Email')
        params['active'] = click.prompt('Active [y/n]', type=bool)
        params['password_hash'] = bcrypt.hashpw(
            click.prompt(
                'Password', hide_input=True, confirmation_prompt=True)
            .encode('utf8'), bcrypt.gensalt(14))
        params = {
            param: value
            for param, value in params.items() if value != ''
        }
        obj = models.User(**params)
    elif table == 'vendor':
        params['vendor_type'] = click.prompt(
            'Vendor Type', type=click.Choice(models.vendor_type_enum.enums))
        params['name'] = click.prompt('Name')
        obj = models.Vendor(**params)
    db.session.add(obj)
    db.session.flush()
    params['id'] = obj.id
    print('Entered parameters:')
    pprint(params)
    db.session.commit()


if __name__ == '__main__':
    database()
