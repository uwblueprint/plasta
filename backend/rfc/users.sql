CREATE TABLE users(
  id BIGSERIAL PRIMARY KEY NOT NULL,
  stakeholder_id BIGSERIAL NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  phone_number VARCHAR(15),
  email VARCHAR(255),
  notes TEXT,
  password TEXT NOT NULL,
  forgot_password_token VARCHAR(10),
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL 
    DEFAULT NOW(),
  updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL 
    DEFAULT NOW() 
);

CREATE TABLE user_attributes(
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL
  data_type TEXT NOT NULL,
  is_required BOOLEAN NOT NULL
);

create TABLE user_values_int(
  id INT PRIMARY KEY,
  FOREIGN KEY (attribute_id) REFERENCES user_attributes(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
  value INT NOT NULL
);

create TABLE user_values_text(
  id BIGSERIAL PRIMARY KEY,
  FOREIGN KEY (attribute_id) REFERENCES user_attributes(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  value TEXT NOT NULL
);
