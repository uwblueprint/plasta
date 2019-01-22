"""add blacklisted_auth_token table

Revision ID: bb9dcde5ba02
Revises: 1f2ce093b5aa
Create Date: 2019-01-21 20:17:35.659360

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bb9dcde5ba02'
down_revision = '1f2ce093b5aa'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('blacklisted_auth_token',
    sa.Column('token', sa.String(length=2047), nullable=False),
    sa.PrimaryKeyConstraint('token')
    )


def downgrade():
    op.drop_table('blacklisted_auth_token')
