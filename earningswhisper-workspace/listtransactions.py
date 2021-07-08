from pprint import pprint
from utilities import make_request
from datetime import datetime
from threading import Timer


def listWalletTransactions(ewallet):
    results = make_request(
        method='get', path=f'/v1/user/{ewallet}/transactions')
    return results['data']
