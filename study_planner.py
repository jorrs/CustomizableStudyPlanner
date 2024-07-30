from flask import Flask
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your_default_secret_key')

@app.route('/')
def home():
    return "Welcome to the Backend Server!"

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('DEBUG', 'False') == 'True'
    
    app.run(host='0.0.0.0', port=port, debug=debug)