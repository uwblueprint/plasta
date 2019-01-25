import os
import json

from app import create_app
from app.routes import db_client


def populate():
    data_dir = "tools/data"
    # We need to maintain an order to ensure that dependencies are
    # satisfied before we try inserting rows into the db
    # ex. user requires a vendor id, so we insert vendor first.
    tables = ['vendor', 'user', 'project', 'transaction']
    create_model_functions = {
        "project": db_client.create_project,
        "transaction": db_client.create_transaction,
        "user": db_client.create_user,
        "vendor": db_client.create_vendor,
    }

    for table in tables:
        print("Seeding table: " + table)
        if create_model_functions[table] is None:
            continue

        test_data_path = os.path.join(os.getcwd(), data_dir, table + ".json")
        with open(test_data_path) as f:
            data = json.load(f)

        create = create_model_functions[table]
        for args in data:
            try:
                create(args)
            except Exception as e:
                print(e)


if __name__ == '__main__':
    app = create_app()
    populate()
