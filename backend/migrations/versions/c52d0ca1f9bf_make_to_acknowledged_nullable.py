"""make to_acknowledged nullable

Revision ID: c52d0ca1f9bf
Revises: bb9dcde5ba02
Create Date: 2019-01-31 19:25:51.587384

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c52d0ca1f9bf'
down_revision = 'bb9dcde5ba02'
branch_labels = None
depends_on = None

transaction_to_acknowledged_new_tcr = sa.sql.table(
    'transaction', sa.Column('to_acknowledged', sa.BOOLEAN(), nullable=True))


def upgrade():
    op.alter_column('transaction', 'to_acknowledged',
               existing_type=sa.BOOLEAN(),
               nullable=True)
    # Change all existing entries to Null.
    op.execute(
        transaction_to_acknowledged_new_tcr.update()
            .where(transaction_to_acknowledged_new_tcr.c.to_acknowledged is not None)
            .values(to_acknowledged=None))


def downgrade():
    # Change all Null entries to True.
    op.execute(
        transaction_to_acknowledged_new_tcr.update()
            .where(transaction_to_acknowledged_new_tcr.c.to_acknowledged == None)
            .values(to_acknowledged=True))
    op.alter_column('transaction', 'to_acknowledged',
               existing_type=sa.BOOLEAN(),
               nullable=False)
