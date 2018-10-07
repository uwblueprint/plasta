"""add vendor subtype

Revision ID: 3e6fd1fe1f30
Revises: 61f38ea5d851
Create Date: 2018-10-07 19:23:05.078573

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '3e6fd1fe1f30'
down_revision = '61f38ea5d851'
branch_labels = None
depends_on = None


def upgrade():
    vendor_subtype = postgresql.ENUM(
        'wastepicker',
        'home_based_worker',
        'itinerant_buyer',
        'wp_community_leader',
        'small_scrap_shop',
        'scrap_shop',
        'van_unit',
        'dwcc',
        'wholesaler',
        'export_wholesaler',
        'franchisee_partner',
        'processor',
        'brand',
        'admin',
        name='vendor_subtype')
    vendor_subtype.create(op.get_bind())

    op.add_column(
        'vendor',
        sa.Column(
            'vendor_subtype',
            sa.Enum(
                'wastepicker',
                'home_based_worker',
                'itinerant_buyer',
                'wp_community_leader',
                'small_scrap_shop',
                'scrap_shop',
                'van_unit',
                'dwcc',
                'wholesaler',
                'export_wholesaler',
                'franchisee_partner',
                'processor',
                'brand',
                'admin',
                name='vendor_subtype'),
            autoincrement=False,
            nullable=False))


def downgrade():
    op.drop_column('vendor', 'vendor_subtype')
    vendor_subtype = postgresql.ENUM(
        'wastepicker',
        'home_based_worker',
        'itinerant_buyer',
        'wp_community_leader',
        'small_scrap_shop',
        'scrap_shop',
        'van_unit',
        'dwcc',
        'wholesaler',
        'export_wholesaler',
        'franchisee_partner',
        'processor',
        'brand',
        'admin',
        name='vendor_subtype')
    vendor_subtype.drop(op.get_bind())
