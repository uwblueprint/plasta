from . import db
from sqlalchemy import inspect
from sqlalchemy.orm.properties import ColumnProperty


class BaseMixin(object):
    __table_args__ = {'extend_existing': True}

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
    def sanitize_metadata(cls, metadata, specification):
        sanitized = {}

        for field, rules in specification.items():
            if not rules['required'] and field not in metadata:
                continue

            datum = metadata[field]
            required_type = specification[field]['type']

            if isinstance(datum, dict):
                sanitized[field] = cls.sanitize_metadata(datum, rules['specification'])
            elif isinstance(datum, specification[field]['type']):
                sanitized[field] = datum
            else:
                raise TypeError(
                    f'Metadata type, {type(datum)} does not match requirement, {required_type}'
                )

        return sanitized

    # TODO(imran): Find abstraction to recursively create subobjects
    @classmethod
    def create(cls, **kwargs):
        if 'meta_data' in kwargs and cls.METADATA_SPECIFICATION is not None:
            kwargs['meta_data'] = cls.sanitize_metadata(
                kwargs['meta_data'], cls.METADATA_SPECIFICATION)
        instance = cls(**kwargs)
        return instance.save()


    def update(self, commit=True, **kwargs):
        for attr, value in kwargs.items():
            setattr(self, attr, value)
        return commit and self.save() or self


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


    def to_dict(self):
        return vars(self)


    def format(self, include_relationships=False):
        cls = type(self)
        # `mapper` allows us to grab the columns of a Model
        mapper = inspect(cls)
        formatted = {}
        for column in mapper.attrs:
            field = column.key
            attr = getattr(self, field)
            # If it's a regular column, extract the value
            if isinstance(column, ColumnProperty):
                formatted[field] = attr
            # Otherwise, it's a relationship field
            elif include_relationships:
                # Recursively format the relationship
                # Don't format the relationship's relationships
                formatted[field] = [obj.format() for obj in attr]
        return formatted
