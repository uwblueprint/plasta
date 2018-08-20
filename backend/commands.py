from pprint import pprint
import click
import bcrypt
from app.app import db
from app import models

table_choice = ('user', 'vendor')

@click.group()
def database():
    pass


@database.command()
@click.option('--table', type=click.Choice(table_choice), required=True)
def add(table):
    params = {}
    if table == 'user':
        params['vendor_id'] = click.prompt('Vendor ID', type=int)
        params['email'] = click.prompt('Email')
        params['active'] = click.prompt('Active [y/N]', type=bool)
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


@database.command()
@click.option('--table', type=click.Choice(table_choice), required=True)
@click.option('--id', type=int, required=True)
def delete(table, id):
    table_types = {'user': models.User, 'vendor': models.Vendor}
    table = table_types[table]
    obj = table.query.filter(table.id == id).one()
    if obj:
        print('Found user:')
        pprint(obj.__dict__)
        if click.confirm('Do you want to delete this?'):
            db.session.delete(obj)
            db.session.commit()
    else:
        print(f'ERROR: could not find user with id = {ID}')

if __name__ == '__main__':
    database()
