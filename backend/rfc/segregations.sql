CREATE TABLE segregations (
  id bigserial primary key,
  source_batch_id bigint NOT NULL,
  total_quantity float(2) NOT NULL,
  segregation_date timestamp default now(),
  created_at timestamp default now(),
  updated_at timestamp default now()
);

CREATE TABLE segregations_attribute(
  attribute_id bigserial primary key,
  name text NOT NULL
);

CREATE TABLE segregations_metadata(
  metadata_id bigserial primary key,
  attribute_id bigint NOT NULL,
  data_type text NOT NULL,
  is_required BOOLEAN NOT NULL
);

CREATE TABLE segregations_value_int(
  id bigserial primary key,
  attribute_id bigint NOT NULL,
  entity_id bigint NOT NULL,
  value float(2) NOT NULL,
);
