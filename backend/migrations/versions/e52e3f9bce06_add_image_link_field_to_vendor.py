"""Add image_link field to vendor

Revision ID: e52e3f9bce06
Revises: c8aca7aa1c63
Create Date: 2018-12-01 15:07:32.829530

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e52e3f9bce06'
down_revision = 'c8aca7aa1c63'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('vendor', sa.Column('image_link', sa.String(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('vendor', 'image_link')
    # ### end Alembic commands ###
