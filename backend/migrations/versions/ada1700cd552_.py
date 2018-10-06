"""empty message

Revision ID: ada1700cd552
Revises: a1b8a4cb1c13
Create Date: 2018-09-20 19:12:01.674448

"""
from alembic import op

# revision identifiers, used by Alembic.
revision = 'ada1700cd552'
down_revision = 'a1b8a4cb1c13'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'project_vendor_map',
                                ['project_id', 'vendor_id'])
    op.drop_constraint(
        'transaction_to_vendor_id_fkey', 'transaction', type_='foreignkey')
    op.drop_constraint(
        'transaction_from_vendor_id_fkey', 'transaction', type_='foreignkey')
    op.create_foreign_key(None, 'transaction', 'vendor', ['from_vendor_id'],
                          ['id'])
    op.create_foreign_key(None, 'transaction', 'vendor', ['to_vendor_id'],
                          ['id'])
    op.create_unique_constraint(None, 'transaction_parent_map',
                                ['transaction_id', 'parent_id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'transaction_parent_map', type_='unique')
    op.drop_constraint(None, 'transaction', type_='foreignkey')
    op.drop_constraint(None, 'transaction', type_='foreignkey')
    op.create_foreign_key('transaction_from_vendor_id_fkey', 'transaction',
                          'user', ['from_vendor_id'], ['id'])
    op.create_foreign_key('transaction_to_vendor_id_fkey', 'transaction',
                          'user', ['to_vendor_id'], ['id'])
    op.drop_constraint(None, 'project_vendor_map', type_='unique')
    # ### end Alembic commands ###
