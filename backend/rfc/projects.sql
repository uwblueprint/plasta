CREATE TABLE projects (
  id bigserial primary key,
  name char(255) NOT NULL,
  description text NOT NULL,
  type integer NOT NULL,
  gdrive_link char(255) NOT NULL,
  shipping_terms integer NOT NULL,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

CREATE TABLE project_users (
  foreign key (project_id) references projects(id),
  foreign key (user_id) references users(id)
);

CREATE TABLE cost_model (
  foreign key (project_id) references projects(id),
  wastepicker_sell_price float(2) NOT NULL,
  wholesaler_purchase_price float(2) NOT NULL,
  wholesaler_sell_price float(2) NOT NULL,
  price_buoyancy float(2) NOT NULL,
  wholesaler_exworks_price float(2) NOT NULL,
  wholesaler_shipping_price float(2) NOT NULL,
  wholesaler_delivered_price float(2) NOT NULL,
  pfc_transaction_fee float(2) NOT NULL
);
