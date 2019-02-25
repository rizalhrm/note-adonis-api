'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NoteSchema extends Schema {
  up () {
    this.create('notes', (table) => {
      table.increments()
      table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users");
      table.string("title");
      table.text("note");
      table.text("image");
      table.text("audio");
      table.timestamps()
    })
  }

  down () {
    this.drop('notes')
  }
}

module.exports = NoteSchema
