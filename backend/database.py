from datetime import datetime
from sqlalchemy import create_engine, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, scoped_session, sessionmaker
from sqlalchemy.sql import func
from sqlalchemy import Column, DateTime, ForeignKey, Integer, Text, String, Boolean, Float

engine = create_engine('sqlite:///test.db', convert_unicode=True)
db_session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

# Many to many relationship
projects_association_table = Table(
    'projects_association', Base.metadata,
    Column('project_id', Integer, ForeignKey('projects.id'), nullable=False),
    Column('user_id', Integer, ForeignKey('users.id'), nullable=False))


class Users(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    stakeholder_id = Column(Integer, nullable=False)
    phone_number = Column(String(15))
    email = Column(String(254))
    notes = Column(Text)
    password = Column(Text, nullable=False)
    forgot_password_token = Column(String(10))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    projects = relationship('Projects', secondary=projects_association_table)


class UserAttributes(Base):
    __tablename__ = 'user_attributes'
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    data_type = Column(Text, nullable=False)
    is_required = Column(Boolean, nullable=False)


class UserValuesInt(Base):
    __tablename__ = 'user_values_int'
    id = Column(Integer, primary_key=True)
    attribute_id = Column(
        Integer, ForeignKey('user_attributes.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    value = Column(Integer, nullable=False)


class UserValuesText(Base):
    __tablename__ = 'user_values_text'
    id = Column(Integer, primary_key=True)
    attribute_id = Column(
        Integer, ForeignKey('user_attributes.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    value = Column(Text, nullable=False)


class Projects(Base):
    __tablename__ = 'projects'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    type = Column(Integer, nullable=False)
    gdrive_link = Column(Integer, nullable=False)
    shipping_terms = Column(Integer, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    users = relationship('Users', secondary=projects_association_table)


class CostModel(Base):
    __tablename__ = 'cost_model'
    project_id = Column(Integer, ForeignKey('projects.id'), primary_key=True)
    wastepicker_sell_price = Column(Float, nullable=False)
    wholesaler_purchase_price = Column(Float, nullable=False)
    wholesaler_sell_price = Column(Float, nullable=False)
    price_buoyancy = Column(Float, nullable=False)
    wholesaler_exworks_price = Column(Float, nullable=False)
    wholesaler_shipping_price = Column(Float, nullable=False)
    wholesaler_delivered_price = Column(Float, nullable=False)
    pfc_transaction_fee = Column(Float, nullable=False)


class Transactions(Base):
    __tablename__ = 'transactions'
    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey('projects.id'), nullable=False)
    from_user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    to_user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    price = Column(Float, nullable=False)
    image = Column(String(255), nullable=False)
    sale_date = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())


class TransactionAttributes(Base):
    __tablename__ = 'transaction_attributes'
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    data_type = Column(Text, nullable=False)
    is_required = Column(Boolean, nullable=False)


class TransactionValuesFloat(Base):
    __tablename__ = 'transaction_values_float'
    id = Column(Integer, primary_key=True)
    attribute_id = Column(
        Integer, ForeignKey('transaction_attributes.id'), nullable=False)
    transaction_id = Column(
        Integer, ForeignKey('transactions.id'), nullable=False)
    value = Column(Float, nullable=False)


class TransactionValuesInt(Base):
    __tablename__ = 'transaction_values_int'
    id = Column(Integer, primary_key=True)
    attribute_id = Column(
        Integer, ForeignKey('transaction_attributes.id'), nullable=False)
    transaction_id = Column(
        Integer, ForeignKey('transactions.id'), nullable=False)
    value = Column(Integer, nullable=False)


class TransactionValuesText(Base):
    __tablename__ = 'transaction_values_text'
    id = Column(Integer, primary_key=True)
    attribute_id = Column(
        Integer, ForeignKey('transaction_attributes.id'), nullable=False)
    transaction_id = Column(
        Integer, ForeignKey('transactions.id'), nullable=False)
    value = Column(Text, nullable=False)


class TransactionParents(Base):
    __tablename__ = 'transaction_parents'
    transaction_id = Column(
        Integer, ForeignKey('transactions.id'), primary_key=True)
    parent_id = Column(
        Integer, ForeignKey('transactions.id'), primary_key=True)


if __name__ == '__main__':
    Base.metadata.create_all(engine)
