import json
from psnapi.Friend import Friend
import tokenfetcher
import threading
import time
from datetime import datetime

from flask import Flask
app = Flask(__name__)
token_loader = tokenfetcher.TokenLoader()
status = {}
most_played = {}


@app.route("/")
def hello():
  return "Hello World!"


@app.route("/psn/played")
def get_current_status():
  return json.dumps(status)


@app.route("/internal/mostplayed")
def get_most_played():
    output = {}
    for game in sorted(most_played, key=most_played.get, reverse=True):
        time = int(most_played[game])
        output[game] = time
    return json.dumps(output)


def get_current_game_status():
  token = token_loader.get_tokens()
  friend = Friend(token)
  json_friends = friend.my_friends()
  return json.dumps(json_friends)


def start_poll_loop():
  t = datetime.now()
  while True:
    token = token_loader.get_tokens()
    friend = Friend(token)
    global status
    global most_played
    status = friend.my_friends()

    dt = t - datetime.now()
    t = datetime.now()

    for game in status.values():
        if game in most_played:
            most_played[game] = most_played[game] + ((dt.seconds / 100000) / 60 / 60)
        else:
            most_played[game] = dt.seconds / 100000 / 60 / 60
    time.sleep(1)

thread = threading.Thread(target=start_poll_loop, args = [])
thread.start()
