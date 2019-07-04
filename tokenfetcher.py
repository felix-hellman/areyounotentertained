from psnapi.Auth import Auth
import json
import os


class TokenLoader:

  tokens = None

  def _get_credentials_as_json(self):
    with open('credentials/info.json') as credentials:
      return json.loads(credentials.read())

  def _fetch_and_write_token(self):
    logininfo = self._get_credentials_as_json()
    print(json.dumps(logininfo))
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

  def _get_tokens(self):
    with open('tokens', encoding='utf-8') as data_file:
      data = json.loads(data_file.read())
      new_token_pair = Auth.GrabNewTokens(data['refresh'])

      tokens = {
        "oauth": new_token_pair[0],
        "refresh": new_token_pair[1],
        "npsso": data['npsso'] # saved above!
      }
      print(tokens)
      return tokens

  def get_tokens(self):
    if self.tokens is not None:
      return self.tokens
    else:
      if not os.path.isfile("tokens"):
        self._fetch_and_write_token()
      self.tokens = self._get_tokens()
      return self._get_tokens()

