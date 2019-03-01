'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DetailNote extends Model {
    static get table() {
        return "detail_notes";
      }
    
    static get primaryKey() {
        return "id";
    }
}

module.exports = DetailNote
