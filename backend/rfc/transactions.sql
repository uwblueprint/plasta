CREATE TABLE transactions (
  id bigserial primary key,
  project_id bigint NOT NULL,
  from_user_id bigint NOT NULL,
  to_user_id bigint NOT NULL,
  price float(2) NOT NULL,
  image char(255) NOT NULL,
  sale_date timestamp default now(),
  created_at timestamp default now(),
  updated_at timestamp default now()
);

CREATE TABLE transaction_attributes(
  id bigserial primary key,
  name text NOT NULL,
  data_type text NOT NULL,
  is_required BOOLEAN NOT NULL
);

CREATE TABLE transaction_values_float(
  id bigserial primary key,
  attribute_id bigint NOT NULL,
  transaction_id bigint NOT NULL,
  value float(2) NOT NULL
);

CREATE TABLE transaction_values_int(
  id bigserial primary key,
  attribute_id bigint NOT NULL,
  transaction_id bigint NOT NULL,
  value int NOT NULL
);

CREATE TABLE transaction_values_text(
  id bigserial primary key,
  attribute_id bigint NOT NULL,
  transaction_id bigint NOT NULL,
  value text NOT NULL
);

CREATE TABLE transaction_parents(
  transaction_id bigint NOT NULL,
  parent_id bigint NOT NULL
);
