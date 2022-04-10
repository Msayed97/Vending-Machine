/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const {user_types} = require('../constants')
exports.up = async function (knex) {
    await  knex.raw('create extension if not exists "uuid-ossp"')
    return knex.schema.createTable('user', (table) => {
            table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'))
            table.primary('id')
            table.string('username').notNullable().unique()
            table.string('password').notNullable()
            table.integer('deposit').defaultTo(0)
            table.enu('role' ,Object.values(user_types)).notNullable()
            table.check('?? >= 0', ['deposit'])
        }).
        createTable('product', (table) => {
            table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'))
            table.uuid('seller_id')
            table.primary('id')
            table.foreign('seller_id').references('id').inTable('user')
            table.string('name').notNullable().unique()
            table.integer('amount')
            table.integer('cost').checkPositive()
            table.check('?? >= 0', ['amount'])
        })
}

exports.down = async function (knex) {
    await knex.schema.
            dropTable('product').
            dropTable('user')
    return knex.raw('drop extension if exists "uuid-ossp"')
}

//npx knex migrate:latest --knexfile utils/knexfile.js
//npx knex migrate:down --knexfile utils/knexfile.js