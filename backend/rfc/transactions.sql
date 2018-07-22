CREATE TABLE transactions (
  id bigserial primary key,
  foreign key (project_id) references projects(id),
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
  foreign key (attribute_id) references transaction_attributes(id),
  foreign key (transaction_id) references transactions(id),
  value float(2) NOT NULL
);

CREATE TABLE transaction_values_int(
  id bigserial primary key,
  foreign key (attribute_id) references transaction_attributes(id),
  foreign key (transaction_id) references transactions(id),
  value int NOT NULL
);

CREATE TABLE transaction_values_text(
  id bigserial primary key,
  foreign key (attribute_id) references transaction_attributes(id),
  foreign key (transaction_id) references transactions(id),
  value text NOT NULL
);

CREATE TABLE transaction_parents(
  foreign key (transaction_id) references transactions(id),
  foreign key (parent_id) references transactions(id)
);
