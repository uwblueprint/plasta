from sqlalchemy.dialects.postgresql import JSONB

from . import db
from .mixins import BaseMixin
from .plastic_type_enum import plastic_type_enum

project_type_enum = db.Enum('internal', 'external', name='project_type')


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

    def link_vendors(self, vendor_ids):
        for vendor_id in vendor_ids:
            ProjectVendorMap.create(project_id=self.id, vendor_id=vendor_id)

    def to_dict(self, include_relationships=False):
        data = super(Project, self).to_dict(include_relationships)
        project_vendor_entries = ProjectVendorMap.get_by(project_id=self.id)
        data['vendors'] = [entry.vendor_id for entry in project_vendor_entries]
        return data


class ProjectVendorMap(BaseMixin, db.Model):
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
