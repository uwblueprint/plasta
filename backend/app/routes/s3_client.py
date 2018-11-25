import base64
import uuid

from . import s3_resource

BUCKET_NAME = 'pfc-resources'


def _generate_key():
    return str(uuid.uuid4()) + ".jpg"


def upload_user_image(data):
    bucket = s3_resource.Bucket(BUCKET_NAME)

    key = bucket.new_key(_generate_key())
    key.set_contents_from_string(base64.b64decode(data))
    key.set_metadata('Content-Type', 'image/jpeg')
    key.set_acl('public-read')

    s3_resource.Object(BUCKET_NAME, key).upload_file(Filename=key)
    return key.generate_url(expires_in=0, query_auth=False)
