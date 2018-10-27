from sqlalchemy.dialects.postgresql import JSONB

from . import db
from .mixins import BaseMixin

project_type_enum = db.Enum('internal', 'external', name='project_type')

plastic_type_enum = db.Enum(
    'green_pet',
    'pet_light_blue',
    'brown_pet',
    'pet_non_food_clear',
    'pet_clear',
    name='plastic_type')


class Project(BaseMixin, db.Model):
    __tablename__ = 'project'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    project_type = db.Column(project_type_enum, nullable=False)
    plastics = db.relationship('ProjectPlasticMap', back_populates='project')
    meta_data = db.Column(JSONB)

    def create_plastics(self, plastics):
        for plastic in plastics:
            plastic['project_id'] = self.id
            ProjectPlasticMap.create(**plastic)


class ProjectVendorMap(db.Model):
    __tablename__ = 'project_vendor_map'
    project_id = db.Column(
        db.Integer, db.ForeignKey('project.id'), primary_key=True)
    vendor_id = db.Column(
        db.Integer, db.ForeignKey('vendor.id'), primary_key=True)
    __table_args__ = (db.Index('IX_project_vendor_map_project_id', project_id),
                      db.Index('IX_project_vendor_map_vendor_id', vendor_id),
                      db.UniqueConstraint('project_id', 'vendor_id'))


class ProjectPlasticMap(BaseMixin, db.Model):
    __tablename__ = 'project_plastic_map'
    project_id = db.Column(
        db.Integer, db.ForeignKey('project.id'), primary_key=True)
    plastic_type = db.Column(
        plastic_type_enum, nullable=False, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    project = db.relationship('Project', back_populates='plastics')
