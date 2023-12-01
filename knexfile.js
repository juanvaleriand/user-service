/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '123456',
      database: 'rental_mobil',
      port: 5432, // Sesuaikan dengan port PostgreSQL Anda
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/migrations', // Lokasi migrasi
    },
  },
};
