from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/todo.html')
def todo():
    return render_template('todo.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')