# Backend

    $ cd backend

## Setup

For venv setup, run:

        $ python3 -m venv venv
        (venv) $ source venv/bin/activate # or source venv/bin/activate.fish
        (venv) $ pip install --upgrade pip pip-tools
        (venv) $ pip-sync # pip install -r requirements.txt

### Postgres for MacOS 

1. Install [brew](https://brew.sh/)

1. For postgres setup, run:

        $ brew install postgresql@10
        $ brew services start postgresql
        $ psql postgres
        =# \q
        $ ./scripts/setup_postgres.sh

### Postgres for Ubuntu

For postgres setup, run:

        $ sudo apt-get install postgresql-10
        $ sudo -u postgres -i
        $ ./scripts/setup_postgres.sh
        $ psql postgres
        =# \q

## Run

    $ source venv/bin/activate # or source venv/bin/activate.fish

To exit the virtual environment:

    (venv) $ deactivate


## Contributing

### Changing requirements

    (venv) $ pip-compile requirements.in

Commit both .in and .txt files.

### Linting

Use PyLint to help standardize styling for the backend.

Full report (command line call):

    (venv) $ find . -iname "*.py" -not -path "*/venv/*" | xargs pylint

This can be configured in your text editor, view the different IDE integrations [here](https://pylint.readthedocs.io/en/latest/user_guide/ide-integration.html).
