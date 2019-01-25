from . import db

plastic_type_enum = db.Enum(
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
