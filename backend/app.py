from flask import Flask
from flask_cors import CORS

from routes.auth_routes import auth_bp
from routes.marketplace_routes import marketplace_bp
from routes.purchase_routes import purchase_bp
app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(
    marketplace_bp,
    url_prefix="/api/marketplace"
)
app.register_blueprint(
    purchase_bp,
    url_prefix="/api/purchase"
)

@app.route("/")
def home():
    return {"message":"Backend Running"}

if __name__ == "__main__":
    app.run(debug=True)