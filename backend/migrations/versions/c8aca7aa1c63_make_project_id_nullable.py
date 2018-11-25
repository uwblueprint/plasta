"""make project_id nullable

Revision ID: c8aca7aa1c63
Revises: 6ffe250980f5
Create Date: 2018-11-25 13:20:52.582123

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'c8aca7aa1c63'
down_revision = '6ffe250980f5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        'transaction',
        'project_id',
        existing_type=sa.INTEGER(),
        nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        'transaction',
        'project_id',
        existing_type=sa.INTEGER(),
        nullable=False)
    # ### end Alembic commands ###