const pgStructure = require('pg-structure');
const expect = require('expect');

const DATABASE_NAME = 'pg_structure_bug';
const DATABASE_USER = 'postgres'
const DATABASE_PASSWORD = 'postgres'
const DATABASE_HOST = 'pgsql';

pgStructure({ database: DATABASE_NAME, user: DATABASE_USER, password: DATABASE_PASSWORD, host: DATABASE_HOST }, ['a', 'b'])
    .then((db) => {
        const failing_table = db.get('b.child');
        expect(failing_table.constraints.get('child_root_id_fkey').parent.fullName).toBe('a.parent');
    })
    .catch(err => console.log(err.stack));