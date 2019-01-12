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
    
Note: if you are on Ubuntu you may have to run the steps in `setup_postgres.sh` manually.


To check if the setup worked, see if `plasta` appears as a role and a database when you run the following commands:

    $ psql postgres
    =# \du
    =# \list
    =# \q

### Environment Variables

    $ cp .env.sample .env

For `APP_SETTINGS`, replace `DevelopmentConfig` with `ProductionConfig` or one of the other configurations in `config.py` according to your needs.

#### Migrations

Activate the virtual environment and run the migrations (steps in the run section below).


## Run

    $ pipenv shell
    # The first time around you will need to run migrations, then populate the database. Make sure to run the following from the root backend folder, `/backend`
    (backend) $ flask db upgrade
    (backend) $ python -m tools.populate_db
    # To start the backend server
    (backend) $ flask run

To exit the virtual environment:

    (backend) $ exit

### Migrations
Each time a database change is made on `master`, run the following to update your local database.

    (backend) $ flask db upgrade

### Production

On a production environment, use gunicorn:

    $ pipenv run gunicorn app:app

### Seed Tool

An easy way to interact with the database from the command line is using the `seed.py` located in the `tools` folder.

You must be in the `backend` folder and _not_ the `tools` folder to use it.

For example, to add a new vendor in the database

    (backend) $ python -m tools.seed add --table vendor

And you will be prompted to fill in specific details.

To get more information

    (backend) $ python -m tools.seed --help


## Contributing

### Changing requirements

Add the requirement using `pipenv install <requirement>`. Use the `--dev` option if the package is not meant for production environment.

This will modify `Pipfile` and `Pipfile.lock`. Commit both files.

### Migrations

We use [Flask Migrate](https://github.com/miguelgrinberg/Flask-Migrate) for database migrations.

After making changes to the schema with SQLALchemy, track changes using

    (backend) $ flask db migrate

To actually reflect those changes on Postgresql, run

    (backend) $ flask db upgrade


### Linting

Ensure the outputs of pylint and flake8 are clean:

    (backend) $ find . -iname "*.py" | xargs pylint
    (backend) $ flake8 .

pylint can be configured with your [IDE](https://pylint.readthedocs.io/en/latest/user_guide/ide-integration.html), you should be able to find one for flake8 as well. There is some overlap in what they report.

Please format your code with yapf before pushing, which also has [IDE](https://github.com/google/yapf/tree/2c13f6f93e8ccfa0c966b67f88eeffe20ccb32a0/plugins#ide-plugins) integrations:

    (backend) $ yapf --recursive --in-place .


## API Specifications

### Auth Routes

`POST /login`

Request:
```
{
  'email': 'user@example.com',
  'password_hash': 'password_hash123'
}
```

Response:

```
{
  'access_token': 'access_token_123'
}
```

Once the user has successfully logged in, they will be provided with an access token. They must pass this access token in the headers as follows:

`-H 'Authorization: Bearer ${access_token}'`

