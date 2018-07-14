# Backend

    $ cd backend

## Setup

### Virtual environment

    $ python3 -m venv venv
    (venv) $ source venv/bin/activate # or source venv/bin/activate.fish
    (venv) $ pip install --upgrade pip pip-tools
    (venv) $ pip-sync # pip install -r requirements.txt

### Postgres for MacOS

1. Install [brew](https://brew.sh/)

1. For postgres setup, run:

        $ brew install postgresql@10
        $ brew services start postgresql
        $ ./scripts/setup_postgres.sh

### Postgres for Ubuntu

For postgres setup, run:

    $ sudo apt-get install postgresql-10
    $ sudo -u postgres -i
    $ ./scripts/setup_postgres.sh


To check if the setup worked, see if `plasta` appears as a role and a database when you run the following commands:

    $ psql postgres
    =# \du
    =# \list
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

Ensure the outputs of pylint and flake8 are clean:

    (venv) $ find . -iname "*.py" -not -path "*/venv/*" | xargs pylint
    (venv) $ flake8 .

pylint can be configured with your [IDE](https://pylint.readthedocs.io/en/latest/user_guide/ide-integration.html), you should be able to find one for flake8 as well. There is some overlap in what they report.

Please format your code with yapf before pushing, which also has [IDE](https://github.com/google/yapf/tree/2c13f6f93e8ccfa0c966b67f88eeffe20ccb32a0/plugins#ide-plugins) integrations:

    (venv) $ yapf --recursive --in-place --exclude venv .
