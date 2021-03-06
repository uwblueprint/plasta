""" Podio client api in Python 3
    Adapted from the official pypodio2 at https://github.com/podio/podio-py"""

from . import transport, client


def build_headers(authorization_headers, user_agent):
    headers = transport.KeepAliveHeaders(authorization_headers)
    if user_agent is not None:
        headers = transport.UserAgentHeaders(headers, user_agent)
    return headers


def OAuthAppClient(client_id, client_secret, app_id, app_token, user_agent=None,
                   domain="https://api.podio.com"):
    auth = transport.OAuthAppAuthorization(app_id, app_token,
                                           client_id, client_secret, domain)

    return AuthorizingClient(domain, auth, user_agent=user_agent)


def AuthorizingClient(domain, auth, user_agent=None):
    """Creates a Podio client using an auth object."""
    http_transport = transport.HttpTransport(domain, build_headers(auth, user_agent))
    return client.Client(http_transport)
