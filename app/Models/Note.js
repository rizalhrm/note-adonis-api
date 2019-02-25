'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Note extends Model {
    static get table() {
        return "notes";
      }
    
    static get primaryKey() {
        return "id";
    }
}

module.exports = Note
