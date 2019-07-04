
from tokenfetcher import TokenLoader

token_loader = TokenLoader()
# this is broken, due to 2fa missing
token_loader.fetch_and_write_token()
