from flask import Flask, render_template
from app1 import app1
from app2 import app2


# app = Flask(__name__)
app = Flask(__name__, static_url_path='/static', static_folder='static', template_folder='templates')

# Endpoint to get data from SQLite
app.register_blueprint(app1, url_prefix='/app1')
app.register_blueprint(app2, url_prefix='/app2')

# Route to the HTML page
@app.route('/')
def index():
    return render_template('index.html')
    # return render_template('V-2/index.html')


if __name__ == '__main__':
    app.run(debug=True)
