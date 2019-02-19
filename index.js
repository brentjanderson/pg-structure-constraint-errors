const pgStructure = require('pg-structure');
const expect = require('expect');

pgStructure({ database: 'pg_structure_bug', user: 'postgres', password: 'postgres', host: 'pgsql' }, ['a', 'b'])
    .then((db) => {
        const failing_table = db.get('b.child');
        expect(failing_table.constraints.get('child_root_id_fkey').parent.fullName).toBe('a.parent');
    })
    .catch(err => console.log(err.stack));