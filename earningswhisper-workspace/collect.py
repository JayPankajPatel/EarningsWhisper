from pprint import pprint
from utilities import make_request


def createTransferBetweenWallets(amount, source_ewallet, destination_ewallet, Description):
    transfer_between_wallets = {
        "amount": f"{amount}",
        "currency": "USD",
        "source_ewallet": f"{source_ewallet}",
        "destination_ewallet": f"{destination_ewallet}",
        "metadata": {
            "merchant_defined": True,
            "Description": f"{Description}"
        }
    }

    transfer_between_wallets_results = make_request(
        method='post', path='/v1/account/transfer', body=transfer_between_wallets)
    return transfer_between_wallets_results["data"].get("id")


def createPayment(ewallet, user, desc):
    body = {
        "receipt_email": '',
        'description': '',
        'address': {
            'name': '{fname} {lname}'.format(fname=user.get("fname"), lname=user.get("lname")),
            'line_1': '{address}'.format(address=user.get("address")),
            'line_2': '',
            'line_3': '',
            'city': '{city}'.format(city=user.get("city")),
            'district': '',
            'canton': '',
            'state': '{state}'.format(state=user.get("state")),
            'country': '{country}'.format(country=user.get("country")),
            'zip': '{zipcode}'.format(zipcode=user.get("zipcode")),
            'phone_number': '{phone}'.format(phone=user.phone("phone")),
            'metadata': {
                'merchant_defined': True,
                'description': "{desc}".format(desc=desc)
            }
        },
        'canton': '',
        'district': ''
    }
    result = make_request(
        'POST', '/v1/payments/payment_37d00f85277fa24e18a2ad67379e044c', body=body)
    return result
