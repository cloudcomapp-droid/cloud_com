import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    password: "Linkastack4!",
    host: "localhost",
    port: 5433,
    database: "perntodo"
});

// export the pool as default
export default pool;