import time
import os
import re
import pytz
import json
from flask import Flask, flash, redirect, url_for, render_template, request, session, jsonify
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from flask_socketio import SocketIO, send, emit
from context.index import tools
from helper import chat_completion_request, pretty_print_conversation
from tenacity import retry, wait_random_exponential, stop_after_attempt
from datetime import date
from sqlalchemy import select, insert, and_, union_all,  text, literal
from flask_bcrypt import Bcrypt
from flask_caching import Cache
import redis


# Configure application
app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)
app.config['CACHE_TYPE'] = 'redis'
app.config['CACHE_REDIS_HOST'] = os.getenv('REDIS_URI')
app.config['CACHE_REDIS_PORT'] = os.getenv('REDIS_PORT')
app.config['CACHE_REDIS_PASSWORD'] = os.getenv('REDIS_PASSWORD')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLITE_URI')
app.config['CACHE_REDIS_DB'] = 0

bcrypt = Bcrypt(app)
# Replace with the appropriate Node.js server URL
socketio = SocketIO(app, cors_allowed_origins=['http://127.0.0.1:3000'])

cache = Cache(app=app)
cache.init_app(app)
redis_client = redis.Redis(host=os.getenv('REDIS_URI'), port=os.getenv('REDIS_PORT'), password=os.getenv('REDIS_PASSWORD'),  db=0)


@socketio.on('connect')
def test_connect():
    print('connected')
    emit('my response', {'data': 'Connected'})


@socketio.on('json', namespace="/parse-recruiter")
@cache.cached(timeout=60, key_prefix='socketio')
@retry(wait=wait_random_exponential(multiplier=1, max=40), stop=stop_after_attempt(3))
def parse_recruiter(json):
    # messages = []
    # messages.append({"role": "system", "content": "Parse recruiter messages to JSON with parameters: is_remote, salary_min, salary_max, contract (boolean), role_name, benefits (array), notes, experience (integer), recruiter, next_step, holidays (integer), response, city, and country. Respond with parsed JSON only, setting NULL for missing data. Do not include any additional prose, notes, or reasoning."})
    # messages.append({"role": "user", "content": 'Hi how are you?'})
    # chat_response = chat_completion_request(
    #     messages, tools=tools
    # )
    # assistant_message = chat_response.choices[0].message
    # res = ''
    # if assistant_message.content:
    #     print('error>>>>>')
    #     res = assistant_message.content  # error
    # else:
    #     print('success>>>>>')        
    #     res = json.loads(assistant_message.tool_calls[0].function.arguments)
    
    # cached_response = redis_client.get('socketio')
    # if cached_response:
    #     return jsonify(cached_response)
    # print(cached_response)
    
    emit('my response', str('hello'))




@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')



@app.route('/items')
def get_items():
    res = redis_client.set("bike:2", "Process 134")
    print(res)
    # >>> True

    res = redis_client.get("bike:2")
    print(res)


    return 'xolor'


# assistant_message.content = str(assistant_message.tool_calls[0].function)
# messages.append({"role": assistant_message.role, "content": assistant_message.content})
# if assistant_message.tool_calls:
#     messages.append({"role": "function", "tool_call_id": assistant_message.tool_calls[0].id, "name": assistant_message.tool_calls[0].function.name, "content": assistant_message.tool_calls[0].function.arguments})
# pretty_print_conversation(messages)


if __name__ == "__main__":
    socketio.run(app)
