"""update plastic types

Revision ID: 3f01a108d7ed
Revises: 22dbc78da032
Create Date: 2019-02-25 21:36:00.100699

 """
from alembic import op
import sqlalchemy as sa


 # revision identifiers, used by Alembic.
revision = '3f01a108d7ed'
down_revision = '22dbc78da032'
branch_labels = None
depends_on = None

plastic_type_name = 'plastic_type'
plastic_type_temp_name = 'temp_' + plastic_type_name

plastic_type_old_options = ('green_pet', 'blue_pet', 'brown_pet', 'non_food_clear_pet',
               'clear_pet', 'mlp', 'clear_film', 'mixed_colour_film',
               'natural_pp', 'white_pp', 'unlabelled_pp', 'labelled_pp',
               'foodgrade_pp','other_pp', 'natural_hdpe', 'white_hdpe',
               'black_hdpe', 'blue_hdpe', 'unlabelled_hdpe', 'labelled_hdpe',
               'mixed_colour_hdpe', 'ld_mix', 'hip', 'abs')
plastic_type_new_options = ('green_pet', 'blue_pet', 'brown_pet', 'non_food_clear_pet',
               'clear_pet', 'mlp', 'clear_film', 'mixed_colour_film', 'pp',
               'unlabelled_pp', 'natural_pp', 'white_pp', 'foodgrade_pp',
               'other_pp', 'natural_hdpe', 'white_hdpe', 'black_hdpe',
               'blue_hdpe', 'unlabelled_hdpe', 'labelled_hdpe',
               'mixed_colour_hdpe', 'ld_mix', 'hip', 'abs', 'mixed_pet', 'ldpe',
               'pugga', 'kadak', 'mixed_plastic_waste', 'films')

plastic_type_old_type = sa.Enum(*plastic_type_old_options, name=plastic_type_name)
plastic_type_new_type = sa.Enum(*plastic_type_new_options, name=plastic_type_name)

project_plastic_type_tcr = sa.sql.table(
    'project_plastic_map',
    sa.Column('plastic_type', plastic_type_new_type, nullable=False))

transaction_plastic_type_tcr = sa.sql.table(
    'transaction_plastic_map',
    sa.Column('plastic_type', plastic_type_new_type, nullable=False))


def upgrade():
    op.execute('ALTER TYPE ' + plastic_type_name + ' RENAME TO ' + plastic_type_temp_name)
    plastic_type_new_type.create(op.get_bind())
    op.execute('ALTER TABLE project_plastic_map ALTER COLUMN plastic_type ' +
               'TYPE ' + plastic_type_name + ' USING plastic_type::text::' + plastic_type_name)
    op.execute('ALTER TABLE transaction_plastic_map ALTER COLUMN plastic_type '
               + 'TYPE ' + plastic_type_name + ' USING plastic_type::text::' + plastic_type_name)
    op.execute('DROP TYPE ' + plastic_type_temp_name)


def downgrade():
    for new_plastic_type in ['pp', 'mixed_pet', 'ldpe', 'pugga', 'kadak',
                             'mixed_plastic_waste', 'films']:
        op.execute(
            project_plastic_type_tcr.delete()
            .where(project_plastic_type_tcr.c.plastic_type == new_plastic_type))
        op.execute(
            transaction_plastic_type_tcr.delete()
            .where(transaction_plastic_type_tcr.c.plastic_type == new_plastic_type))
    op.execute('ALTER TYPE ' + plastic_type_name + ' RENAME TO ' + plastic_type_temp_name)
    plastic_type_old_type.create(op.get_bind())
    op.execute('ALTER TABLE project_plastic_map ALTER COLUMN plastic_type ' +
               'TYPE ' + plastic_type_name + ' USING plastic_type::text::' + plastic_type_name)
    op.execute('ALTER TABLE transaction_plastic_map ALTER COLUMN plastic_type '
               + 'TYPE ' + plastic_type_name + ' USING plastic_type::text::' + plastic_type_name)
    op.execute('DROP TYPE ' + plastic_type_temp_name)
