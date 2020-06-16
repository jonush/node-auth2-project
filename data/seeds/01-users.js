
exports.seed = function(knex) {
  return knex('users')
    .then(function () {
      return knex('users').insert([
        {username: 'John', password: 'pass', department: 'finance'},
        {username: 'Jane', password: 'word', department: 'engineering'},
        {username: 'Jimmy', password: 'password', department: 'design'}
      ]);
    });
};