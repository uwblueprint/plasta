import base64
import uuid

from . import s3_resource

REGION = 'ap-south-1'
BUCKET_NAME = 'pfc-resources'


def _generate_key():
    return str(uuid.uuid4()) + ".jpg"


def _create_image_link(key):
    return 'https://s3.{}.amazonaws.com/{}/{}'.format(
        REGION,
        BUCKET_NAME,
        key
    )


def upload_user_image(image):
    image.seek(0)
    key = _generate_key()
    s3_resource.Bucket(name=BUCKET_NAME).upload_fileobj(
        Fileobj=image,
        Key=key,
        ExtraArgs={'ACL': 'public-read'},
    )

    return _create_image_link(key)
