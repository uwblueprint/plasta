#!/bin/bash
createdb $(whoami) &> /dev/null # fixes postgres error

db_name='plasta'
db_user="$db_name"
db_pass='plasword'

dropdb --if-exists "$db_name"
psql -tAc "DROP ROLE IF EXISTS ${db_user};"

psql -tAc "CREATE USER $db_user WITH PASSWORD '${db_pass}';"
createdb "$db_name"

echo "Created user and database."
