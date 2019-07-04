from psnapi.Auth import Auth
from psnapi.Friend import Friend
from psnapi.User import User
from psnapi.Messaging import Messaging
import json
import os


class TokenLoader:


  def get_credentials_as_json(self):
    with open('credentials/info.json') as credentials:
      return json.loads(credentials.read())


  def fetch_and_write_token(self):
    logininfo = self.get_credentials_as_json()
    print(json.dumps(logininfo))
    print(logininfo['2FA'])
    auth = Auth(
        logininfo['YOUR_EMAIL'],
        logininfo['YOUR_PASSWORD'],
        logininfo['TICKET_UUID'],
        logininfo['2FA']
    )

    tokens = auth.get_tokens()


    f = open('tokens', 'wt', encoding='utf-8')
    f.write(json.dumps(tokens))
    f.close()

  def tokens_exist(self):
    return os.path.isfile("tokens")

  def get_tokens(self):
    with open('tokens', encoding='utf-8') as data_file:
      data = json.loads(data_file.read())
      new_token_pair = Auth.GrabNewTokens(data['refresh'])

      tokens = {
        "oauth": new_token_pair[0],
        "refresh": new_token_pair[1],
        "npsso": data['npsso'] # saved above!
      }
      return tokens

