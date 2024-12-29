import time
import os
import re
import pytz
import json
from flask import Flask, flash, redirect, url_for, render_template, request, session, jsonify
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from flask_socketio import SocketIO, send, emit, Namespace, disconnect
from context.index import tools
from helper import chat_completion_request, pretty_print_conversation, parse_language_resume_data
from tenacity import retry, wait_random_exponential, stop_after_attempt
from datetime import date
from sqlalchemy import select, insert, and_, union_all,  text, literal
from flask_bcrypt import Bcrypt
from flask_caching import Cache
from resume_ai import create_ai
import redis
import jwt
from client import send_error, send_success


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
redis_client = redis.Redis(host=os.getenv('REDIS_URI'), port=os.getenv(
    'REDIS_PORT'), password=os.getenv('REDIS_PASSWORD'),  db=0)

SECRET_KEY = os.getenv('HALF_KEY')


@socketio.on('connect', namespace="/her-ai")
def handle_connect():
    token = request.headers.get('Authorization')
    if not token or not token.startswith('Bearer '):
        print("Invalid or missing token")
    try:
        # Verify and decode the JWT token
        decoded_token = jwt.decode(token[7:], SECRET_KEY, algorithms=['HS256'])
        print("User ID:", decoded_token['name'])
        print("Username:", decoded_token['password'])
        print("Token verified successfully")
    except jwt.ExpiredSignatureError:
        print("Token has expired")
    except jwt.InvalidTokenError:
        print("Invalid token")
    print("Connected")


@socketio.on('parse-recruiter', namespace="/her-ai")
@retry(wait=wait_random_exponential(multiplier=1, max=40), stop=stop_after_attempt(3))
def parse_recruiter(data_parse_recruiter):
    token = request.headers.get('Authorization')
    if not token or not token.startswith('Bearer '):
        emit('parse-recruiter', "Invalid request")
    if not data_parse_recruiter['msg']:
        emit('parse-recruiter', "Invalid request")
    try:
        # Verify and decode the JWT token
        # decoded_token = jwt.decode(token[7:], SECRET_KEY, algorithms=['HS256'])
        messages = []
        messages.append({"role": "system", "content": "Parse recruiter messages into JSON with the following parameters: is_remote, salary_min, salary_max, contract (boolean), role_name, benefits (array), notes, experience (integer), recruiter, next_step, holidays (integer), response, city, country, and title. Respond with the parsed JSON only, setting NULL for any missing data. Do not include additional prose, notes, or reasoning. Don't make assumptions about values to plug into functions. Ask for clarification if a user request is ambiguous."})
        messages.append(
            {"role": "user", "content": data_parse_recruiter['msg']})
        chat_response = chat_completion_request(
            messages, tools=tools
        )
        assistant_message = chat_response.choices[0].message
        res = ''
        if assistant_message.content:
            print('error>>>>>')
            res = assistant_message.content  # error
            send_error(emit, 'parse-recruiter', json.loads(res))
        else:
            print('success>>>>>')
            res = json.loads(
                assistant_message.tool_calls[0].function.arguments)
            send_success(emit, 'parse-recruiter', "Response Successfully", res)

    except jwt.ExpiredSignatureError:
        send_error(emit, 'parse-recruiter', "Invalid request")
    except jwt.InvalidTokenError:
        send_error(emit, 'parse-recruiter', "Invalid request")


@socketio.on('resume-ai', namespace="/her-ai")
@retry(wait=wait_random_exponential(multiplier=1, max=40), stop=stop_after_attempt(3))
def resume_ai(data_resume):
    token = request.headers.get('Authorization')
    if not token or not token.startswith('Bearer '):
        emit('resume-ai', "Invalid request")
    if not data_resume['personal']:
        emit('resume-ai', "Invalid request")
    if not data_resume['job']:
        emit('resume-ai', "Invalid request")
    try:
        content_language = "You will be given commands and your task is to turn them into a story about yourself in standard "
        if data_resume['language'] == "english":
            content_language += "English."
        elif data_resume['language'] == "vietnam":
            content_language = "Vietnamese."
        # content_language += " Requires clarification of information: full name, email, phone number, birthday, address, zipcode."
        messages = [
            {"role": "system", "content": content_language},
            {"role": "user",
                "content": f"Here is my information: {data_resume['personal']} \n Here is recruitment information: {data_resume['job']}"}
        ]
        parse_language_response = parse_language_resume_data(messages)
        if parse_language_response.choices[0].message.content:
            print('create_ai(parse_language_response.choices[0].message.content)', parse_language_response.choices[0].message.content)

            send_success(emit, 'resume-ai', "Response Successfully", create_ai(parse_language_response.choices[0].message.content, data_resume['language']))
        else:
            send_error(emit, 'resume-ai', 'No content available')

    except jwt.ExpiredSignatureError:
        send_error(emit, 'resume-ai', "Invalid request")

    except jwt.InvalidTokenError:
        send_error(emit, 'resume-ai', "Invalid request")


@socketio.on('disconnect', namespace="/her-ai")
def handle_disconnect():
    print('Client disconnected')


# @socketio.on('connect', namespace="/resume-ai")
# def handle_connect():
#     token = request.headers.get('Authorization')
#     if not token or not token.startswith('Bearer '):
#         print("Invalid or missing token")
#     try:
#         # Verify and decode the JWT token
#         decoded_token = jwt.decode(token[7:], SECRET_KEY, algorithms=['HS256'])
#         print("User ID:", decoded_token['name'])
#         print("Username:", decoded_token['password'])
#         print("Token verified successfully")
#     except jwt.ExpiredSignatureError:
#         print("Token has expired")
#     except jwt.InvalidTokenError:
#         print("Invalid token")
#     print("Connected")


# @socketio.on('disconnect', namespace="/resume-ai")
# def handle_disconnect():
#     print('Client disconnected')


@app.route('/')
def index():
    return create_ai()

# assistant_message.content = str(assistant_message.tool_calls[0].function)
# messages.append({"role": assistant_message.role, "content": assistant_message.content})
# if assistant_message.tool_calls:
#     messages.append({"role": "function", "tool_call_id": assistant_message.tool_calls[0].id, "name": assistant_message.tool_calls[0].function.name, "content": assistant_message.tool_calls[0].function.arguments})
# pretty_print_conversation(messages)


if __name__ == "__main__":
    socketio.run(app)
    app.run()
