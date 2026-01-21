---
title: Simple Bash Script to Import a Database Safely
date: 2026-01-13
---

i keep needing this, so I stopped rewriting it every time

this script:

- checks if the DB exists
- optionally drops it
- imports a `.sql` file

### Script

```bash
#!/bin/bash

DB_NAME=$1
SQL_FILE=$2
FORCE=$3

if [ -z "$DB_NAME" ] || [ -z "$SQL_FILE" ]; then
  echo "Usage: ./import.sh db_name file.sql [--force]"
  exit 1
fi

if mysql -e "use $DB_NAME" 2>/dev/null; then
  if [ "$FORCE" = "--force" ]; then
    mysql -e "DROP DATABASE $DB_NAME"
    mysql -e "CREATE DATABASE $DB_NAME"
  else
    echo "Database exists. Use --force to overwrite."
    exit 1
  fi
else
  mysql -e "CREATE DATABASE $DB_NAME"
fi

mysql $DB_NAME < $SQL_FILE
echo "Import done."
```
