from flask import Flask


def create_app():

    app = Flask(__name__, instance_relative_config=False)

    app.config.from_object("config.config.Config")

    with app.app_context():

        from routes.reports import reports
        from routes.academic import academic
        from routes.auth import auth
        from routes.admin import admin
        from routes.load_notes import load_notes

        app.register_blueprint(reports)
        app.register_blueprint(academic)
        app.register_blueprint(auth)
        app.register_blueprint(admin)
        app.register_blueprint(load_notes)

    return app
