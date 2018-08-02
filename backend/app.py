from flask import Flask
from flask_graphql import GraphQLView

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

@app.route('/')
def hello_world():
    return 'Hello from flask!'

if __name__=='__main__':
    from schema import schema
    app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', graphiql=True,
                                                            schema=schema))
    app.run()
