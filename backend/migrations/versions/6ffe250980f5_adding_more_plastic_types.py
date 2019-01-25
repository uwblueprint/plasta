"""Adding more plastic types.

Revision ID: 6ffe250980f5
Revises: 3e6fd1fe1f30
Create Date: 2018-11-18 15:19:31.810489

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '6ffe250980f5'
down_revision = '3e6fd1fe1f30'
branch_labels = None
depends_on = None

name = 'plastic_type'
temp_name = 'temp_' + name

old_options = ('green_pet', 'pet_light_blue', 'brown_pet',
               'pet_non_food_clear', 'pet_clear')
new_options = ('green_pet', 'blue_pet', 'brown_pet', 'non_food_clear_pet',
               'clear_pet', 'mlp', 'clear_film', 'mixed_colour_film',
               'natural_pp', 'white_pp', 'unlabelled_pp', 'labelled_pp',
               'foodgrade_pp', 'other_pp', 'natural_hdpe', 'white_hdpe',
               'black_hdpe', 'blue_hdpe', 'unlabelled_hdpe', 'labelled_hdpe',
               'mixed_colour_hdpe', 'ld_mix', 'hip', 'abs')

old_type = sa.Enum(*old_options, name=name)
new_type = sa.Enum(*new_options, name=name)

tcr = sa.sql.table('project_plastic_map',
                   sa.Column('plastic_type', new_type, nullable=False))

# table: project_plastic_map, column: plastic_type


def upgrade():
    op.execute('ALTER TYPE ' + name + ' RENAME TO ' + temp_name)
    new_type.create(op.get_bind())
    op.execute('ALTER TABLE project_plastic_map ALTER COLUMN plastic_type ' +
               'TYPE ' + name + ' USING plastic_type::text::' + name)
    op.execute('ALTER TABLE transaction_plastic_map ALTER COLUMN plastic_type '
               + 'TYPE ' + name + ' USING plastic_type::text::' + name)
    op.execute('DROP TYPE ' + temp_name)


def downgrade():
    op.execute(tcr.update().where(
        tcr.c.plastic_type == 'output_limit_exceeded').values(
            status='timed_out'))
    op.execute('ALTER TYPE ' + name + ' RENAME TO ' + temp_name)
    old_type.create(op.get_bind())
    op.execute('ALTER TABLE project_plastic_map ALTER COLUMN plastic_type ' +
               'TYPE ' + name + ' USING plastic_type::text::' + name)
    op.execute('ALTER TABLE transaction_plastic_map ALTER COLUMN plastic_type '
               + 'TYPE ' + name + ' USING plastic_type::text::' + name)
    op.execute('DROP TYPE ' + temp_name)
