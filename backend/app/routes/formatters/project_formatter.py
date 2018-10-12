# TODO(imran): Lots of code duplication, figure out an abstraction
def _format_plastic_info(plastic_info):
    fields = ['project_id', 'plastic_type', 'quantity']
    plastic_info_dict = plastic_info.to_dict()
    return {field: plastic_info_dict[field] for field in fields}


def format_project(project):
    fields = ['id', 'name', 'project_type', 'plastics']
    project_dict = project.to_dict()
    formatted = {}
    for field in fields:
        if field == 'plastics':
            formatted[field] = [_format_plastic_info(plastic_info)
                                for plastic_info in project.plastics]
        else:
            formatted[field] = project_dict[field]
    return formatted


def format_projects(projects):
    return [format_project(project) for project in projects]
