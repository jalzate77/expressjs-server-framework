const modelBase = require('../model')
const database = 'mzcf-mtp'
const collection = 'users'

function list(query) {
    return modelBase.list(database, collection, query)
}

function save(model) {
    return modelBase.save(database, collection, model)
}

function remove(model) {
    return modelBase.remove(database, collection, { id: model.id })
}

module.exports = {
    list,
    save,
    remove
}