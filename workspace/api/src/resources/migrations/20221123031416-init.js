'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function (db) {
  await db.runSql(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

  await db.runSql(`
    CREATE TABLE IF NOT EXISTS assets (
      id UUID NOT NULL DEFAULT uuid_generate_v4(),
      type VARCHAR(255) NOT NULL,
      uri VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITHOUT TIME ZONE default (now() at time zone 'utc'),
      updated_at TIMESTAMP WITHOUT TIME ZONE default (now() at time zone 'utc')
    );
  `);

  await db.runSql(`
    CREATE TABLE IF NOT EXISTS conversations (
      id UUID NOT NULL DEFAULT uuid_generate_v4(),
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITHOUT TIME ZONE default (now() at time zone 'utc'),
      updated_at TIMESTAMP WITHOUT TIME ZONE default (now() at time zone 'utc')
    );
  `);

  await db.runSql(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID NOT NULL DEFAULT uuid_generate_v4(),
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      is_verified BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP WITHOUT TIME ZONE default (now() at time zone 'utc'),
      updated_at TIMESTAMP WITHOUT TIME ZONE default (now() at time zone 'utc')
    );
  `);

  await db.runSql(`
    CREATE TABLE IF NOT EXISTS conversation_user (
      id UUID NOT NULL DEFAULT uuid_generate_v4(),
      conversation_id UUID NOT NULL,
      user_id UUID NOT NULL,
      created_at TIMESTAMP WITHOUT TIME ZONE default (now() at time zone 'utc'),
      updated_at TIMESTAMP WITHOUT TIME ZONE default (now() at time zone 'utc')
    );
  `);

  await db.runSql(`
    CREATE TABLE IF NOT EXISTS messages (
      id UUID NOT NULL DEFAULT uuid_generate_v4(),
      conversation_id UUID NOT NULL,
      user_id UUID NOT NULL,
      content TEXT NOT NULL,
      is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP WITHOUT TIME ZONE default (now() at time zone 'utc'),
      updated_at TIMESTAMP WITHOUT TIME ZONE default (now() at time zone 'utc')
    );
  `);
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
