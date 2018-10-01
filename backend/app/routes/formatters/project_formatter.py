# TODO(imran): Make sure this handles `relationship` columns
def format_project(project):
    fields = ['name', 'project_type', 'plastics']
    project_dict = project.to_dict()
    return {field: project_dict[field] for field in fields}


def format_projects(projects):
    return (format_project(project) for project in projects)
