'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfileSchema extends Schema {
  up () {
    this.create('profiles', (table) => {
      table.increments()
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users");
      table.string("name");
      table.date("birth_date");
      table.string("gender");
      table.timestamps()
    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfileSchema
