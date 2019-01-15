"""change vendor type

Revision ID: 0619babf6bf9
Revises: e52e3f9bce06
Create Date: 2019-01-13 22:37:32.515599

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0619babf6bf9'
down_revision = 'e52e3f9bce06'
branch_labels = None
depends_on = None

vendor_type_name = 'vendor_type'
vendor_type_temp_name = 'temp_' + vendor_type_name

vendor_type_old_options = ('admin', 'wastepicker', 'dwcc',
                           'wholesaler', 'manufacturer')
vendor_type_inter_options = ('admin', 'wastepicker', 'dwcc', 'primary_segregator',
                             'wholesaler', 'manufacturer')
vendor_type_new_options = ('admin', 'wastepicker', 'primary_segregator',
                           'wholesaler', 'manufacturer')

vendor_type_old_type = sa.Enum(*vendor_type_old_options, name=vendor_type_name)
vendor_type_inter_type = sa.Enum(*vendor_type_inter_options, name=vendor_type_name)
vendor_type_new_type = sa.Enum(*vendor_type_new_options, name=vendor_type_name)

vendor_type_inter_tcr = sa.sql.table('vendor',
                                     sa.Column('vendor_type',
                                               vendor_type_inter_type,
                                               nullable=False))

vendor_subtype_name = 'vendor_subtype'
vendor_subtype_temp_name = 'temp_' + vendor_subtype_name

vendor_subtype_old_options = ('wastepicker', 'home_based_worker', 'itinerant_buyer',
                              'wp_community_leader', 'small_scrap_shop', 'scrap_shop',
                              'van_unit', 'dwcc', 'wholesaler',
                              'export_wholesaler', 'franchisee_partner', 'processor',
                              'brand', 'admin')
vendor_subtype_inter_options = ('wastepicker', 'home_based_worker', 'itinerant_buyer',
                                'wp_community_leader', 'small_scrap_shop', 'scrap_shop',
                                'van_unit', 'dwcc', 'primary_segregator', 'wholesaler',
                                'export_wholesaler', 'franchisee_partner', 'processor',
                                'brand', 'admin')
vendor_subtype_new_options = ('wastepicker', 'home_based_worker', 'itinerant_buyer',
                              'wp_community_leader', 'small_scrap_shop', 'scrap_shop',
                              'van_unit', 'primary_segregator', 'wholesaler',
                              'export_wholesaler', 'franchisee_partner', 'processor',
                              'brand', 'admin')

vendor_subtype_old_type = sa.Enum(*vendor_subtype_old_options, name=vendor_subtype_name)
vendor_subtype_inter_type = sa.Enum(*vendor_subtype_inter_options, name=vendor_subtype_name)
vendor_subtype_new_type = sa.Enum(*vendor_subtype_new_options, name=vendor_subtype_name)

vendor_subtype_inter_tcr = sa.sql.table('vendor',
                                        sa.Column('vendor_subtype',
                                                  vendor_subtype_inter_type,
                                                  nullable=False))


def upgrade():
    op.create_table('primary_segregator_wastepicker_map',
                    sa.Column('wastepicker_id', sa.Integer(), nullable=False),
                    sa.Column('primary_segregator_id', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['primary_segregator_id'], ['vendor.id'], ),
                    sa.ForeignKeyConstraint(['wastepicker_id'], ['vendor.id'], ),
                    sa.PrimaryKeyConstraint('wastepicker_id'),
                    sa.UniqueConstraint('primary_segregator_id', 'wastepicker_id'))
    op.create_index('IX_primary_segregator_wastepicker_map_primary_segregator_id',
                    'primary_segregator_wastepicker_map', ['primary_segregator_id'], unique=False)
    op.drop_index('IX_dwcc_wastepicker_map_dwcc_id', table_name='dwcc_wastepicker_map')
    op.drop_table('dwcc_wastepicker_map')

    op.execute('ALTER TYPE ' + vendor_type_name + ' RENAME TO ' + vendor_type_temp_name)
    vendor_type_inter_type.create(op.get_bind())
    op.execute('ALTER TABLE vendor ALTER COLUMN vendor_type ' +
               'TYPE ' + vendor_type_name + ' USING vendor_type::text::' + vendor_type_name)
    op.execute(
        vendor_type_inter_tcr.update()
        .where(vendor_type_inter_tcr.c.vendor_type == 'dwcc')
        .values(vendor_type='primary_segregator'))
    op.execute('DROP TYPE ' + vendor_type_temp_name)
    op.execute('ALTER TYPE ' + vendor_type_name + ' RENAME TO ' + vendor_type_temp_name)
    vendor_type_new_type.create(op.get_bind())
    op.execute('ALTER TABLE vendor ALTER COLUMN vendor_type ' +
               'TYPE ' + vendor_type_name + ' USING vendor_type::text::' +
               vendor_type_name)
    op.execute('DROP TYPE ' + vendor_type_temp_name)

    op.execute('ALTER TYPE ' + vendor_subtype_name + ' RENAME TO ' + vendor_subtype_temp_name)
    vendor_subtype_inter_type.create(op.get_bind())
    op.execute('ALTER TABLE vendor ALTER COLUMN vendor_subtype ' +
               'TYPE ' + vendor_subtype_name + ' USING vendor_subtype::text::'
               + vendor_subtype_name)
    op.execute(
        vendor_subtype_inter_tcr.update()
        .where(vendor_subtype_inter_tcr.c.vendor_subtype == 'dwcc')
        .values(vendor_subtype='primary_segregator'))
    op.execute('DROP TYPE ' + vendor_subtype_temp_name)
    op.execute('ALTER TYPE ' + vendor_subtype_name + ' RENAME TO ' + vendor_subtype_temp_name)
    vendor_subtype_new_type.create(op.get_bind())
    op.execute('ALTER TABLE vendor ALTER COLUMN vendor_subtype ' +
               'TYPE ' + vendor_subtype_name + ' USING vendor_subtype::text::' +
               vendor_subtype_name)
    op.execute('DROP TYPE ' + vendor_subtype_temp_name)


def downgrade():
    op.create_table('dwcc_wastepicker_map',
                    sa.Column('wastepicker_id', sa.INTEGER(), autoincrement=False, nullable=False),
                    sa.Column('dwcc_id', sa.INTEGER(), autoincrement=False, nullable=True),
                    sa.ForeignKeyConstraint(['dwcc_id'], ['vendor.id'],
                                            name='dwcc_wastepicker_map_dwcc_id_fkey'),
                    sa.ForeignKeyConstraint(['wastepicker_id'], ['vendor.id'],
                                            name='dwcc_wastepicker_map_wastepicker_id_fkey'),
                    sa.PrimaryKeyConstraint('wastepicker_id', name='dwcc_wastepicker_map_pkey'),
                    sa.UniqueConstraint('dwcc_id', 'wastepicker_id',
                                        name='dwcc_wastepicker_map_dwcc_id_wastepicker_id_key'))
    op.create_index('IX_dwcc_wastepicker_map_dwcc_id', 'dwcc_wastepicker_map', ['dwcc_id'],
                    unique=False)
    op.drop_index('IX_primary_segregator_wastepicker_map_primary_segregator_id',
                  table_name='primary_segregator_wastepicker_map')
    op.drop_table('primary_segregator_wastepicker_map')

    op.execute('ALTER TYPE ' + vendor_type_name + ' RENAME TO ' + vendor_type_temp_name)
    vendor_type_inter_type.create(op.get_bind())
    op.execute('ALTER TABLE vendor ALTER COLUMN vendor_type ' +
               'TYPE ' + vendor_type_name + ' USING vendor_type::text::' + vendor_type_name)
    op.execute(
        vendor_type_inter_tcr.update()
        .where(vendor_type_inter_tcr.c.vendor_type == 'primary_segregator')
        .values(vendor_type='dwcc'))
    op.execute('DROP TYPE ' + vendor_type_temp_name)
    op.execute('ALTER TYPE ' + vendor_type_name + ' RENAME TO ' + vendor_type_temp_name)
    vendor_type_old_type.create(op.get_bind())
    op.execute('ALTER TABLE vendor ALTER COLUMN vendor_type ' +
               'TYPE ' + vendor_type_name + ' USING vendor_type::text::' + vendor_type_name)
    op.execute('DROP TYPE ' + vendor_type_temp_name)

    op.execute('ALTER TYPE ' + vendor_subtype_name + ' RENAME TO ' + vendor_subtype_temp_name)
    vendor_subtype_inter_type.create(op.get_bind())
    op.execute('ALTER TABLE vendor ALTER COLUMN vendor_subtype ' +
               'TYPE ' + vendor_subtype_name + ' USING vendor_subtype::text::' +
               vendor_subtype_name)
    op.execute(
        vendor_subtype_inter_tcr.update()
        .where(vendor_subtype_inter_tcr.c.vendor_subtype == 'primary_segregator')
        .values(vendor_subtype='dwcc'))
    op.execute('DROP TYPE ' + vendor_subtype_temp_name)
    op.execute('ALTER TYPE ' + vendor_subtype_name + ' RENAME TO ' + vendor_subtype_temp_name)
    vendor_subtype_old_type.create(op.get_bind())
    op.execute('ALTER TABLE vendor ALTER COLUMN vendor_subtype ' +
               'TYPE ' + vendor_subtype_name + ' USING vendor_subtype::text::' +
               vendor_subtype_name)
    op.execute('DROP TYPE ' + vendor_subtype_temp_name)
