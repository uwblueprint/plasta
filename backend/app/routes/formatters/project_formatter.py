# TODO(imran): Make sure this handles `relationship` columns
def format_project(project):
    fields = ['id', 'name', 'project_type']
    project_dict = vars(project)
    return {field: project_dict[field] for field in fields}


def format_projects(projects):
    return (format_project(project) for project in projects)
