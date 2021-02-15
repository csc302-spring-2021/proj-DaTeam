CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE ehealth;

CREATE TYPE sdcItemType AS ENUM (
  'form',
  'displayItem',
  'section',
  'listField',
  'textField'
);

CREATE TYPE textFieldType AS ENUM (
  'anyType',
  'anyURI',
  'base64Binary',
  'boolean',
  'duration',
  'ID',
  'int',
  'integer',
  'byte',
  'date',
  'dateTime',
  'dateTimeStamp',
  'decimal',
  'double',
  'float',
  'gDay',
  'gMonth',
  'gMonthDay',
  'gYear',
  'gYearMonth',
  'hexBinary',
  'HTML',
  'long',
  'negativeInteger',
  'NMTOKENS',
  'nonNegativeInteger',
  'nonPositiveInteger',
  'positiveInteger',
  'short',
  'string',
  'time',
  'unsignedByte',
  'unsignedInt',
  'unsignedLong',
  'unsignedShort',
  'XML',
  'yearMonthDuration'
);

CREATE TABLE prodecure (
  uid uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  id text UNIQUE NOT NULL,
  assignedFormID uuid,
  creationTime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE patient (
  uid uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  id text,
  name text NOT NULL,
  creationTime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE item (
  uid uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  id text NOT NULL,
  parent_id uuid,
  itemType sdcItemType NOT NULL,
  title text,
  displayOrder integer,
  creationTime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE form (
  uid uuid PRIMARY KEY,
  lineage text NOT NULL,
  version text NOT NULL,
  header text,
  footer text
);

CREATE TABLE formProperty (
  formId uuid NOT NULL,
  displayOrder integer,
  name text NOT NULL,
  propName text NOT NULL,
  val text,
  PRIMARY KEY (formId, propName)
);

CREATE TABLE listField (
  uid uuid PRIMARY KEY,
  minSelections integer NOT NULL,
  maxSelections integer NOT NULL,
  lookupEndPoint text
);

CREATE TABLE listFieldItem (
  uid uuid PRIMARY KEY,
  listId uuid NOT NULL,
  textResponse uuid,
  selectionDeselectsSiblings boolean NOT NULL,
  selectionDisablesChildren boolean NOT NULL
);

CREATE TABLE textField (
  uid uuid PRIMARY KEY,
  textAfterResponse text,
  fieldType textFieldType NOT NULL
);

CREATE TABLE formResponse (
  uid uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  formId uuid NOT NULL,
  patientId uuid NOT NULL,
  creationTime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE answer (
  uid uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  responseId uuid NOT NULL,
  questionId text NOT NULL,
  response text NOT NULL
);

ALTER TABLE prodecure ADD FOREIGN KEY (assignedFormID) REFERENCES form (uid);

ALTER TABLE item ADD FOREIGN KEY (parent_id) REFERENCES item (uid);

ALTER TABLE form ADD FOREIGN KEY (uid) REFERENCES item (uid);

ALTER TABLE formProperty ADD FOREIGN KEY (formId) REFERENCES form (uid);

ALTER TABLE listField ADD FOREIGN KEY (uid) REFERENCES item (uid);

ALTER TABLE listFieldItem ADD FOREIGN KEY (uid) REFERENCES item (uid);

ALTER TABLE listFieldItem ADD FOREIGN KEY (listId) REFERENCES listField (uid);

ALTER TABLE listFieldItem ADD FOREIGN KEY (textResponse) REFERENCES textField (uid);

ALTER TABLE textField ADD FOREIGN KEY (uid) REFERENCES item (uid);

ALTER TABLE formResponse ADD FOREIGN KEY (formId) REFERENCES form (uid);

ALTER TABLE formResponse ADD FOREIGN KEY (patientId) REFERENCES patient (uid);

ALTER TABLE answer ADD FOREIGN KEY (responseId) REFERENCES formResponse (uid);

CREATE INDEX ON prodecure (id);

CREATE INDEX ON patient (id);

CREATE UNIQUE INDEX ON item (id, parent_id);

CREATE INDEX ON item (parent_id);

CREATE UNIQUE INDEX ON form (lineage, version);

CREATE INDEX ON formProperty (formId);

CREATE INDEX ON listFieldItem (listId);

CREATE INDEX ON formResponse (formId);

CREATE INDEX ON answer (responseId);

CREATE INDEX ON answer (questionId);
