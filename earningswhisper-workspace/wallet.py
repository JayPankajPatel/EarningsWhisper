from pprint import pprint
import random
from utilities import make_request

# Creating personal wallet


def createPersonalWallet(fname, lname, birthdate, email, phone, address,
                         zipcode, city, state, country):
    num = genRandom()
    personal_wallet = {
        "first_name": f"{fname}",
        "last_name": f"{lname}",
        "email": "",
        "ewallet_reference_id": f"{fname}-{lname}-{num}",
        "metadata": {
            "merchant_defined": True
        },
        "phone_number": "",
        "type": "person",
        "contact": {
            "phone_number": f"+1{phone}",
            "email": f"{email}",
            "first_name": f"{fname}",
            "last_name": f"{lname}",
            "mothers_name": "Jane Smith",
            "contact_type": "personal",
            "address": {
                "name": f"{fname} {lname}",
                "line_1": f"{address}",
                "line_2": "",
                "line_3": "",
                "city": f"{city}",
                "state": "CA",
                "country": f"{country}",
                "zip": f"{zipcode}",
                "phone_number": f"+1{phone}",
                "metadata": {},
                "canton": "",
                "district": ""
            },
            "identification_type": "PA",
            "identification_number": "1234567890",
            "date_of_birth": f"{birthdate}",
            "country": f"{country}",
            "metadata": {
                "merchant_defined": True
            }
        }
    }

    personal_wallet_results = make_request(
        method='post', path='/v1/user', body=personal_wallet)
    return personal_wallet_results["data"]["contacts"]["data"][0]


def createCard(cont_id, country):
    card = {
        "ewallet_contact": f"{cont_id}",
        "country": f"{country}",
    }

    results = make_request(method='post', path=f'/v1/issuing/cards', body=card)
    return results


def activateCard(card):
    card = {
        "card": f"{card}"
    }

    results = make_request(
        method='post', path=f'/v1/issuing/cards/activate', body=card)
    return results


def setPinCode(card, pin):
    body = {
        "card": f"{card}",
        "new_pin": f"{pin}"
    }

    results = make_request(
        method='post', path=f'/v1/issuing/cards/pin', body=body)
    return results


def getCard(card_id):
    results = make_request(
        method='get', path=f'/v1/issuing/cards/{card_id}')
    return results['data']


def getPersonalWallet(wallet):
    results = make_request(method="get", path=f'/v1/user/{wallet}')
    return results


def getPersonalContact(wallet, contact):
    results = make_request(
        method='get', path=f'/v1/ewallets/{wallet}/contacts/{contact}')
    return results


def editWallet(wallet, walletref):
    body = {
        "ewallet": f"{wallet}",
        "ewallet_reference_id": f"{walletref}",
        "metadata": {
            "merchant_defined": "updated"
        }
    }

    results = make_request(method="put", path='/v1/user', body=body)
    pprint(results)


def deleteWallet(wallet):
    delete = make_request(method="delete", path=f'/v1/user/{wallet}')
    pprint(delete)

# data-keys: id, currency, balance


def getWalletBalance(wallet):
    results = make_request(
        method="get", path=f"/v1/user/{wallet}/accounts")
    if(len(results['data']) == 0):
        return '0'
    return results["data"][0].get("balance")


def genRandom():
    random.seed()
    return random.randrange(1, 1000000, 2)
