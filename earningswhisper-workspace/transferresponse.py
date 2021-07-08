from pprint import pprint

from utilities import make_request

# status can be accept, decline,cancel


def handleFundsTransfer(id):
    handle_funds = {
        "id": f"{id}",
        "status": "accept",
        "metadata": {
            "merchant-defined": "accepted",
        }
    }
    sucessfulFundsTransfer = make_request(
        method='post', path='/v1/account/transfer/response', body=handle_funds)
    return sucessfulFundsTransfer
