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


def upgrade():
    plastic_type_enum = postgresql.ENUM(
        'green_pet',
        'blue_pet',
        'brown_pet',
        'non_food_clear_pet',
        'clear_pet',
        'mlp',
        'clear_film',
        'mixed_colour_film',
        'natural_pp',
        'white_pp',
        'unlabelled_pp',
        'labelled_pp',
        'foodgrade_pp',
        'other_pp',
        'natural_hdpe',
        'white_hdpe',
        'black_hdpe',
        'blue_hdpe',
        'unlabelled_hdpe',
        'labelled_hdpe',
        'mixed_colour_hdpe',
        'ld_mix',
        'hip',
        'abs',
        name='plastic_type')
    plastic_type_enum.create(op.get_bind())


def downgrade():
    plastic_type_enum = postgresql.ENUM(
        'green_pet',
        'pet_light_blue',
        'brown_pet',
        'pet_non_food_clear',
        'pet_clear',
        name='plastic_type')
    plastic_type_enum.drop(op.get_bind())
