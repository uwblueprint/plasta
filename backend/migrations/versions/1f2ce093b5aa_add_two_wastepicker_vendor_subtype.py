"""add two wastepicker vendor subtype

Revision ID: 1f2ce093b5aa
Revises: 0619babf6bf9
Create Date: 2019-01-17 19:09:00.100699

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1f2ce093b5aa'
down_revision = '0619babf6bf9'
branch_labels = None
depends_on = None

vendor_subtype_name = 'vendor_subtype'
vendor_subtype_temp_name = 'temp_' + vendor_subtype_name

vendor_subtype_old_options = ('wastepicker', 'home_based_worker', 'itinerant_buyer',
                              'wp_community_leader', 'small_scrap_shop', 'scrap_shop',
                              'van_unit', 'primary_segregator', 'wholesaler',
                              'export_wholesaler', 'franchisee_partner', 'processor',
                              'brand', 'admin')
vendor_subtype_new_options = ('wastepicker', 'home_based_worker', 'itinerant_buyer',
                              'wp_community_leader', 'small_scrap_shop', 'door_to_door_collection',
                              'pourakarmikas', 'scrap_shop', 'van_unit', 'primary_segregator',
                              'wholesaler', 'export_wholesaler', 'franchisee_partner', 'processor',
                              'brand', 'admin')

vendor_subtype_old_type = sa.Enum(*vendor_subtype_old_options, name=vendor_subtype_name)
vendor_subtype_new_type = sa.Enum(*vendor_subtype_new_options, name=vendor_subtype_name)

vendor_subtype_tcr = sa.sql.table(
    'vendor',
    sa.Column('vendor_subtype', vendor_subtype_new_type, nullable=False))


def upgrade():
    op.execute('ALTER TYPE ' + vendor_subtype_name + ' RENAME TO ' + vendor_subtype_temp_name)
    vendor_subtype_new_type.create(op.get_bind())
    op.execute('ALTER TABLE vendor ALTER COLUMN vendor_subtype ' +
               'TYPE ' + vendor_subtype_name + ' USING vendor_subtype::text::' +
               vendor_subtype_name)
    op.execute('DROP TYPE ' + vendor_subtype_temp_name)


def downgrade():
    # Change all existing new vendor subtype types in the database back to 'wastepicker'.
    for new_wastepicker_subtype in ['door_to_door_collection', 'pourakarmikas']:
        op.execute(
            vendor_subtype_tcr.update()
                .where(vendor_subtype_tcr.c.vendor_subtype == new_wastepicker_subtype)
                .values(vendor_subtype='wastepicker'))
    op.execute('ALTER TYPE ' + vendor_subtype_name + ' RENAME TO ' + vendor_subtype_temp_name)
    vendor_subtype_old_type.create(op.get_bind())
    op.execute('ALTER TABLE vendor ALTER COLUMN vendor_subtype ' +
               'TYPE ' + vendor_subtype_name + ' USING vendor_subtype::text::' +
               vendor_subtype_name)
    op.execute('DROP TYPE ' + vendor_subtype_temp_name)
