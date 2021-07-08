from pprint import pprint

from utilities import make_request


def sendMoney(personOne, accountNum, bankName, route, desc, amount, personTwo, accountNumTwo):
    payout_body = {
        "beneficiary": {
            "name": "{fname} {lname}".format(fname=personOne.get("fname"), lname=personOne.get("lname")),
            "address": "{address}".format(address=personOne.get("address")),
            "email": "{email}".format(email=personOne.get("email")),
            "country": "{country}".format(country=personOne.get("country")),
            "city": "{city}".format(city=personOne.get("city")),
            "postcode": "{zipcode}".format(zipcode=personOne.get("zipcode")),
            "account_number": "{accountNum}".format(accountNum=accountNum),
            "bank_name": "{bankName}".format(bankName=bankName),
            "state": "{state}".format(state=personOne.get("state")),
            "identification_type": "SSC",
            "identification_value": "123456789",
            "bic_swift": "BUINBGSF",
            "ach_code": "{routeNumber}".format(route=route)
        },
        "beneficiary_country": "{country}".format(country=personOne.get("country")),
        "beneficiary_entity_type": "individual",
        "description": "{desc}".format(desc=desc),
        "merchant_reference_id": "GHY-0YU-HUJ-POI",
        "ewallet": "{ewallet}".format(ewallet=personOne.get("ewallet")),
        "payout_amount": "{amount}".format(amount=amount),
        "payout_currency": "USD",
        "payout_method_type": "us_general_bank",
        "sender": {
            "name": "{fname} {lname}".format(fname=personTwo.get("fname"), lname=personTwo.get("lname")),
            "address": "{address}".format(address=personTwo.get("address")),
            "city": "{city}".format(city=personTwo.get("city")),
            "state": "{state}".format(state=personTwo.get("state")),
            "date_of_birth": "{birthdate}".format(birthdate=personTwo.get("birthdate")),
            "postcode": "{zipcode}".format(zipcode=personTwo.get("zipcode")),
            "phonenumber": "{phonenumber}".format(phone=personTwo.get("phone")),
            "remitter_account_type": "Individual",
            "source_of_income": "salary",
            "identification_type": "License No",
            "identification_value": "123456789",
            "purpose_code": "ABCDEFGHI",
            "account_number": "{accountNumTwo}".format(accountNumTwo=accountNumTwo),
            "beneficiary_relationship": "client"
        },
        "sender_country": "US",
        "sender_currency": "USD",
        "sender_entity_type": "individual",
        "metadata": {
            "merchant_defined": True
        }
    }
    result = make_request(method='post', path='/v1/payouts', body=payout_body)
    pprint(result)
