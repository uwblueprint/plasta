"""add_podio_item_id_to_transaction_table

Revision ID: 19d1d78098a8
Revises: 
Create Date: 2019-05-14 10:38:14.745320

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '19d1d78098a8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('transaction', sa.Column('podio_item_id', sa.Integer(), nullable=True))


def downgrade():
    op.drop_column('transaction', 'podio_item_id')
