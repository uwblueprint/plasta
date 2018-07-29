from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['BCRYPT_LOG_ROUNDS'] = 15

db = SQLAlchemy(app)

password = b"passwordtohash"
password_hash = bcrypt.hashpw(password, bcrypt.gensalt(14))
print(password_hash)

if bcrypt.checkpw(password, password_hash):
    print("it matches")
else:
    print("it does not match")
