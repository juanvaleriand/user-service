exports.up = function (knex) {
    return knex.schema.table('users', function (table) {
      table.string('verification_code');
    });
};
  
exports.down = function (knex) {
    return knex.schema.table('users', function (table) {
      table.dropColumn('verification_code');
    });
};