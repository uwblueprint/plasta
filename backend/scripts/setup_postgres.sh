#!/bin/bash
user=$(whoami)

echo "Creating database for ${user}"

# sudo -u postgres createuser --interactive < $user < "y"
# sudo -u postgres createdb $(whoami) &> /dev/null # fixes postgres error

db_name='plasta'
db_user="$db_name"
db_pass='plasword'

sudo -u postgres dropdb --if-exists "$db_name"
sudo -u postgres psql -tAc "DROP ROLE IF EXISTS ${db_user};"

sudo -u postgres psql -tAc "CREATE USER $db_user WITH PASSWORD '${db_pass}';"
sudo -u postgres createdb "$db_name"

echo "Created user and database."
