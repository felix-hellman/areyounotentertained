import json
from psnapi.Friend import Friend
import tokenfetcher
import threading
import time

from flask import Flask
app = Flask(__name__)
token_loader = tokenfetcher.TokenLoader()
status = {}

@app.route("/")
def hello():
  return "Hello World!"

@app.route("/psn/played")
def get_current_status():
  return json.dumps(status)

def get_current_game_status():
  token = token_loader.get_tokens()
  friend = Friend(token)
  json_friends = friend.my_friends()
  return json.dumps(json_friends)

def start_poll_loop():
  while True:
    token = token_loader.get_tokens()
    friend = Friend(token)
    global status
    status = friend.my_friends()
    time.sleep(15)

thread = threading.Thread(target=start_poll_loop, args = [])
thread.start()
