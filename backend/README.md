# Backend

```
cd backend
```

## Setup

```
python3 -m venv venv
source venv/bin/activate # or source venv/bin/activate.fish
pip install --upgrade pip pip-tools
pip-sync # pip install -r requirements.txt
```

## Run

```
source venv/bin/activate # or source venv/bin/activate.fish # if not already in virtual env
```

To exit the virtual environment:
```
deactivate
```

## Contributing

Changing requirements:

```
pip-compile requirements.in
```

Commit both .in and .txt files.


### Using PyLint

Use PyLint to help standardize styling for the backend. 

Full report (command line call):
```
find . -iname "*.py" -not -path "*/venv/*" | xargs pylint
```

This can be configured in your text editor, view the different IDE integrations [here](https://pylint.readthedocs.io/en/latest/user_guide/ide-integration.html).
