# PG Structure foreign key constraint bug

## How to run

### With Docker

`docker-compose up`

### Without Docker

1. Create a database `pg_structure_bug` in Postgres
    * Tested with Postgres 10.4
2. Run the `setup.sql` script in that database
3. `npm i`
4. `npm run test`

## Context

A database has two separate schemas A and B. Both schemas have two tables with the same names: `parent` and `child`. Thus, we have four tables in the database:

* `a.parent`
* `a.child`
* `b.parent`
* `b.child`

The columns in each table don't matter __except__ for a FK column from `b.child` that refers to `a.parent`.

* `a.parent`
  * `id text PRIMARY KEY`
* `a.child`
  * `id text PRIMARY KEY`
* `b.parent`
  * `id text PRIMARY KEY`
* `b.child`
  * `id text PRIMARY KEY`
  * `parent_id text REFERENCES a.parent(id)`

(The script [`setup.sql`](./setup.sql) will setup this structure when testing)

## Expected

When `pg-structure` introspects the schema, the FK constraint on `b.child` should refer to `a.parent`.

## Actual

`pg-structure` returns an FK constraint on `b.child` that points to `b.parent`.
