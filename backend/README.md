# Backend

    $ cd backend


## Setup

### Virtual environment

We use [pipenv](https://github.com/pypa/pipenv#-usage).

    $ pip install pipenv
    $ pipenv install --dev

### Database Setup

#### Postgres for MacOS

1. Install [brew](https://brew.sh/)

1. Run:

        $ brew install postgresql@10
        $ brew services start postgresql
        $ ./scripts/setup_postgres.sh

#### Postgres for Ubuntu

    $ sudo apt-get install postgresql-10
    $ sudo -u postgres -i
    $ ./scripts/setup_postgres.sh


To check if the setup worked, see if `plasta` appears as a role and a database when you run the following commands:

    $ psql postgres
    =# \du
    =# \list
    =# \q

### Environment Variables

    $ export FLASK_APP=app/app.py
    $ export APP_SETTINGS=config.DevelopmentConfig

Replace `DevelopmentConfig` with `ProductionConfig` or one of the other configurations in `config.py` according to your needs. 

#### Migrations

Activate the virtual environment and run the migrations (steps in the run section below).


## Run

    $ pipenv shell

To exit the virtual environment:

    (backend) $ exit

### Migrations

    (backend) $ flask db upgrade

## Contributing

### Changing requirements

Add the requirement using `pipenv install <requirement>`. Use the `--dev` option if the package is not meant for production environment.

This will modify `Pipfile` and `Pipfile.lock`. Commit both files.

### Migrations

We use [Flask Migrate](https://github.com/miguelgrinberg/Flask-Migrate) for database migrations.

After making changes to the schema, track changes using

    (backend) $ flask db migrate

To actually modify the schema, run

    (backend) $ flask db upgrade

### Linting

Ensure the outputs of pylint and flake8 are clean:

    (backend) $ find . -iname "*.py" | xargs pylint
    (backend) $ flake8 .

pylint can be configured with your [IDE](https://pylint.readthedocs.io/en/latest/user_guide/ide-integration.html), you should be able to find one for flake8 as well. There is some overlap in what they report.

Please format your code with yapf before pushing, which also has [IDE](https://github.com/google/yapf/tree/2c13f6f93e8ccfa0c966b67f88eeffe20ccb32a0/plugins#ide-plugins) integrations:

    (backend) $ yapf --recursive --in-place .
