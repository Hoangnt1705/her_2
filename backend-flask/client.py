from flask import jsonify

def send_error(emit, name_gate , message, code=401):
    response = {
        "sussess": False,
        "message": message,
        "code": code,
    }
    emit(name_gate, response)

def send_success(emit, name_gate, message, data):
    response_json = {
        "success": True,
        "message": message,
        "code": 200,
    }
    if data:
        response_json["data"] = data
    emit(name_gate, response_json)