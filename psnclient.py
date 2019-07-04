
from tokenfetcher import TokenLoader
from psnapi.Friend import Friend
from psnapi.Auth import Auth
import time
import json


def main():
  saftblandare_triggered = False

  token_loader = TokenLoader()
  token = token_loader.get_tokens()

  friends = Friend(token)

  while True:
    print("loop")
    json_friends = friends.my_friends()
    print(json.dumps(json_friends))
    if is_playing_fifa(json_friends) and not saftblandare_triggered:
      trigger_saftblandare()
    time.sleep(15)





def is_playing_fifa(data):
  return True

def trigger_saftblandare():
  return True

main()