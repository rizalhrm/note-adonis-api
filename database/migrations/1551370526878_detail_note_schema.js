'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DetailNoteSchema extends Schema {
  up () {
    this.create('detail_notes', (table) => {
      table.integer("note_id")
      .unsigned()
      .references("id")
      .inTable("notes");
      table.string("generate_id");
      table.text("text");
      table.timestamps()
    })
  }

  down () {
    this.drop('detail_notes')
  }
}

module.exports = DetailNoteSchema
