import time
import os
import re
import pytz
import json
from flask import Flask, flash, redirect, url_for, render_template, request, session, jsonify
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import date
from openai import OpenAI
from tenacity import retry, wait_random_exponential, stop_after_attempt
from termcolor import colored
from flask_socketio import SocketIO, send, emit

GPT_MODEL = "gpt-3.5-turbo-0125"
api_key = os.environ.get("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

# Configure application
app = Flask(__name__)
app.config['SECRET_KEY'] = 'her_web_application'
# Replace with the appropriate Node.js server URL
# Replace with the appropriate Node.js server URL
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")


@socketio.on('connect')
def test_connect():
    print('connected')
    emit('my response', {'data': 'Connected'})


@socketio.on('json')
def handle_json(json):
    print('received json: ' + str(json))
    emit('my response', str(json))
    


@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')


def chat_completion_request(messages, tools=None, tool_choice=None, model=GPT_MODEL):
    try:
        response = client.chat.completions.create(
            model=model,
            response_format={"type": "json_object"},
            messages=messages,
            tools=tools,
            tool_choice=tool_choice,
        )
        return response
    except Exception as e:
        print("Unable to generate ChatCompletion response")
        print(f"Exception: {e}")
        return e


def pretty_print_conversation(messages):
    role_to_color = {
        "system": "red",
        "user": "green",
        "assistant": "blue",
        "function": "magenta",
    }

    for message in messages:
        if message["role"] == "system":
            print(
                colored(f"system: {message['content']}\n", role_to_color[message["role"]]))
        elif message["role"] == "user":
            print(
                colored(f"user: {message['content']}\n", role_to_color[message["role"]]))
        elif message["role"] == "assistant" and message.get("function_call"):
            print(colored(
                f"assistant: {message['function_call']}\n", role_to_color[message["role"]]))
        elif message["role"] == "assistant" and not message.get("function_call"):
            print(
                colored(f"assistant: {message['content']}\n", role_to_color[message["role"]]))
        elif message["role"] == "function":
            print(colored(
                f"function ({message['name']}): {message['content']}\n", role_to_color[message["role"]]))


tools = [
    {
        "type": "function",
        "function": {
            "name": "parse-recruiters",
            "description": "You are a parser that takes in recruiter messages and converts them in to a JSON object",
            "parameters": {
                "type": "object",
                "properties": {
                    "is_remote": {
                        "type": "boolean",
                        "description": "whether or not the opportunity is remote",
                    },
                    "salary_min": {
                        "type": "number",
                        "description": "The minimum salary",
                    },
                    "salary_max": {
                        "type": "number",
                        "description": "The maximum salary",
                    },
                    "contract": {
                        "type": "boolean",
                        "description": "Whether or not the position is a contract/freelance position, or a full-time role",
                    },
                    "role_name": {
                        "type": "string",
                        "description": "The name of the role, if possible",
                    },
                    "benefits": {
                        "type": "string",
                        "description": "Any miscellaneous benefits",
                    },
                    "notes": {
                        "type": "string",
                        "description": "Any extra information you see that may be of note",
                    },
                    "experience": {
                        "type": "number",
                        "description": "If added, the amount of experience required in years",
                    },
                    "recruiter": {
                        "type": "string",
                        "description": "The name of the recruiter",
                    },
                    "next_step": {
                        "type": "string",
                        "description": "The suggested next step in the recruitment process, usually a call or interview"
                    },
                    "holidays": {
                        "type": "number",
                        "description": "The holiday during the year"
                    },
                    "city": {
                        "type": "string",
                        "description": "The city"
                    },
                    "country": {
                        "type": "string",
                        "description": "The country."
                    }
                },
                "required": ["is_remote", "salary_min", "salary_max", "contract", "role_name", "benefits", "notes", "experience", "recruiter", "next_step", "holiday", "city", "country"],
            },
        }
    }
]


# @app.route('/')
# # @retry(wait=wait_random_exponential(multiplier=1, max=40), stop=stop_after_attempt(3))
# def hello_world():

#     text = f"""Mô tả công việc
# • Tham gia phát triển phần mềm theo quy trình Agile/ Scrum;

# • Được đào tạo công nghệ và thực chiến qua các dự án lớn.

# • Chủ động và phối hợp đồng nghiệp và đối tác hoàn thành các việc được giao.

# • Nghiên cứu, tìm kiếm, đề xuất các giải pháp/sáng kiến CNTT

# Yêu cầu ứng viên
# Tốt nghiệp ĐH (bắt buộc) chuyên ngành CNTT, Toán Tin, hoặc tương đương.

# • Có >=2 năm kinh nghiệm Java, Spring.

# • Thành thạo framework springboot

# • Thành thạo Mysql. elasticsearch, redis, mongodb, kafka

# • Thành thạo Restful, SoapAPI, Websocket

# • Sử dụng thành thạo một số công cụ: Git, Jira, ...

# • Có khả năng tự học tốt, tư duy tốt, chịu được áp lực công việc cao.

# • Có khả năng nghiên cứu và giải quyết công việc độc lập.

# • Đam mê công việc, tích cực tìm hiểu các kiến thức mới;

# • Ưu tiên có kiến thức và kinh nghiệm công nghệ Kafka, Microservice là một lợi thế;

# • Ưu tiên có kiến thức và kinh nghiệm triển khai về K8s, docker là một lợi thế;

# Quyền lợi
# Mức lương: upto 35,00,000VND hoặc thỏa thuận theo kinh nghiệm thực tế

# Đóng Bảo hiểm xã hội, Bảo hiểm y tế, Bảo hiểm thất nghiệp theo quy định Luật Lao động. Nghỉ phép: 12 ngày/năm
# Có phụ cấp ăn trưa và thưởng thâm niên (với nhân viên chính thức làm việc > 1 năm)
# Chế độ thăm hỏi: cưới hỏi, thai sản, đau ốm, ma chay: 1.000.000
# Chính sách ứng trước lương, ứng trước ngày nghỉ phép
# Địa điểm làm việc
# - Hà Nội: ngõ Núi Trúc, Kim Mã, Ba Đình, Ba Đình
# - Hà Nội: Tôn Thất Thuyết, Cầu Giấy, Cầu Giấy
# Thời gian làm việc
# Thứ 2 - Thứ 6 (từ 08:00 đến 18:00)"""

#     messages = []
#     messages.append({"role": "system", "content": "Parse recruiter messages to JSON with parameters: is_remote, salary_min, salary_max, contract (boolean), role_name, benefits (array), notes, experience (integer), recruiter, next_step, holidays (integer), response, city, and country. Respond with parsed JSON only, setting NULL for missing data. Do not include any additional prose, notes, or reasoning."})
#     messages.append({"role": "user", "content": text})
#     chat_response = chat_completion_request(
#         messages, tools=tools
#     )
#     assistant_message = chat_response.choices[0].message
#     if assistant_message.content:
#         print(assistant_message.content)  # error
#     else:
#         return json.loads(assistant_message.tool_calls[0].function.arguments)

# assistant_message.content = str(assistant_message.tool_calls[0].function)
# messages.append({"role": assistant_message.role, "content": assistant_message.content})
# if assistant_message.tool_calls:
#     messages.append({"role": "function", "tool_call_id": assistant_message.tool_calls[0].id, "name": assistant_message.tool_calls[0].function.name, "content": assistant_message.tool_calls[0].function.arguments})
# pretty_print_conversation(messages)


if __name__ == "__main__":
    socketio.run(app)
