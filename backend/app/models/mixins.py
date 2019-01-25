from sqlalchemy import inspect
from sqlalchemy.orm.properties import ColumnProperty

from . import db
from .metadata_specs import METADATA_SPECS

METADATA_COLUMN = 'meta_data'


class BaseMixin:
    __table_args__ = {'extend_existing': True}

    @classmethod
    def sanitize_metadata(cls, metadata, specification):
        sanitized = {}
        for field, rules in specification.items():
            if not rules['required'] and field not in metadata:
                continue

            datum = metadata[field]
            required_type = specification[field]['type']

            if isinstance(datum, dict):
                sanitized[field] = cls.sanitize_metadata(
                    datum, rules['specification'])
            elif isinstance(datum, required_type):
                sanitized[field] = datum
            else:
                raise TypeError(
                    f'Metadata type, {type(datum)} does not match requirement, {required_type}'
                )

        return sanitized

    @classmethod
    def get(cls, _id):
        return cls.query.get(int(_id))

    @classmethod
    def get_by(cls, first=False, **kwargs):
        rows = cls.query.filter_by(**kwargs)
        if first:
            return rows.first()
        return rows.all()

    @classmethod
    def create(cls, **kwargs):
        metadata_spec = METADATA_SPECS.get(cls.__tablename__, {})
        if METADATA_COLUMN in kwargs and metadata_spec is not None:
            kwargs[METADATA_COLUMN] = cls.sanitize_metadata(
                kwargs[METADATA_COLUMN], metadata_spec)

        instance = cls(**kwargs)
        return instance.save()

    def update(self, commit=True, **kwargs):
        for attr, value in kwargs.items():
            setattr(self, attr, value)
        return self.save() if commit else self

    def save(self, commit=True):
        db.session.add(self)
        if commit:
            try:
                db.session.commit()
            except Exception:
                db.session.rollback()
                raise
        return self

    def delete(self, commit=True):
        db.session.delete(self)
        return commit and db.session.commit()

    def to_dict(self, include_relationships=False):
        cls = type(self)
        # `mapper` allows us to grab the columns of a Model
        mapper = inspect(cls)
        formatted = {}
        for column in mapper.attrs:
            field = column.key
            if hasattr(cls, 'TO_DICT_WHITELIST') and \
                    field not in cls.TO_DICT_WHITELIST:
                continue

            attr = getattr(self, field)
            # If it's a regular column, extract the value
            if isinstance(column, ColumnProperty):
                formatted[field] = attr
            # Otherwise, it's a relationship field
            elif include_relationships:
                # Recursively format the relationship
                # Don't format the relationship's relationships
                formatted[field] = [obj.to_dict() for obj in attr]
        return formatted
