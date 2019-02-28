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

    static get dates () {
        return super.dates.concat(['created_at', 'updated_at'])
    }

    static castDates (field, value) {
    	if (['created_at', 'updated_at'].indexOf(field) > -1) {
      		return value.format('YYYY-MM-DD h:mm:ss')
    	}
		return super.formatDates(field, value)
    }

    detail_notes () {
        return this.belongsTo('App/Models/DetailNote')
    }

    users () {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Note
