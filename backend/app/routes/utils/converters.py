from werkzeug.routing import BaseConverter


class ListConverter(BaseConverter):
    def to_python(self, value):
        return value.split(',')

    def to_url(self, value):
        return ','.join(str(x) for x in value)
