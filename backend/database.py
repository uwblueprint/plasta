from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

from sqlalchemy import Column, DateTime, ForeignKey, Integer, Text, String, Boolean

# Replace 'sqlite:///rfg.db' with your path to database
engine = create_engine('sqlite:///test.db', convert_unicode=True)
db_session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()


class Users(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    stakeholder_id = Column(Integer, nullable=False)
    phone_number = Column(String(15))
    email = Column(String(254))
    notes = Column(Text)
    password = Column(Text, nullable=False)
    forgot_password_token = Column(String(10))
    created = Column(DateTime, nullable=False)


class UserAttributes(Base):
    __tablename__ = 'user_attributes'
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    data_type = Column(Text, nullable=False)
    is_required = Column(Boolean, nullable=False)


class UserValuesInt(Base):
    __tablename__ = 'user_values_int'
    id = Column(Integer, primary_key=True)
    attribute_id = Column(Integer, ForeignKey('user_attribute.id'))
    user_id = Column(Integer, ForeignKey('user.id'))
    value = Column(Integer, nullable=False)


class UserValuesText(Base):
    __tablename__ = 'user_values_text'
    id = Column(Integer, primary_key=True)
    attribute_id = Column(Integer, ForeignKey('user_attribute.id'))
    user_id = Column(Integer, ForeignKey('user.id'))
    value = Column(Text, nullable=False)


Base.metadata.create_all(engine)
