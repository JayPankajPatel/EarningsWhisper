from setup import request, jsonify, requests, datetime, timedelta, YahooEarningsCalendar
from backend import Users, UsersSchema, db, app
from functions import Convert, Term, Earnings, handleFundsTransfer, autoAccept, listWalletTransactions, createPersonalWallet, getWalletBalance, Grade_calculate, Useremail, createPayment, createCard, activateCard, setPinCode, getCard, getUser


@app.route('/signup', methods=['POST'])
def Signup():
    data = request.get_json()

    username = data['username']
    fname = data['fname']
    lname = data['lname']
    birthdate = data['birthdate']
    email = data['email']
    phone = data['phone']
    address = data['address']
    zipcode = data['zipcode']
    city = data['city']
    state = data['_state']
    country = data['country']
    password = data['password']
    question = data['question']
    answer = data['answer']

    wallet_results = createPersonalWallet(fname, lname, birthdate, email, phone, address,
                                          zipcode, city, state, country)
    ewallet_id = wallet_results.get("ewallet")
    contact_id = wallet_results.get("id")
    card_results = createCard(contact_id, country)
    card_id = card_results['data'].get('card_id')
    activateCard(card_id)

    user = Users(username, fname, lname, birthdate, email, phone, address,
                 zipcode, city, state, country, password, question, answer, ewallet_id, contact_id, card_id)

    db.session.add(user)
    db.session.commit()

    return "Success"


@app.route('/userinfo')
def Userinfo():
    user = Users.query.all()
    user_schema = UsersSchema(many=True)
    output = user_schema.dump(user)
    return jsonify({'user': output})


@app.route('/user', methods=['POST'])
def User():
    id = request.get_json()["ewallet"]
    output = getUser(id)
    return jsonify({'user': output})


@app.route('/dailystock', methods=['GET'])
def DailyStock():
    today = datetime.now()
    n = today.weekday()
    if n > 4:
        today = today + timedelta(days=7-n)
    date_string = today.strftime('%b %d %Y %I:%M%p')
    date_from = datetime.strptime(date_string, '%b %d %Y %I:%M%p')
    yec = YahooEarningsCalendar()
    earnings = yec.earnings_on(date_from)
    term = date_string
    earnings.append(term)
    earningday = {'time': earnings}

    return jsonify(earningday)


@app.route('/weeklystock', methods=['GET'])
def WeeklyStock():
    week = Term()
    return jsonify(Earnings(week[0], week[1], 1))


@app.route('/monthlystock', methods=['GET'])
def MonthlyStock():
    week = Term()
    return jsonify(Earnings(week[0], week[1], 3))


@app.route('/stockinfo', methods=['POST'])
def stockinfo():
    stock = request.get_json()
    stock_symbol = stock['stocksymbol']
    str_stk = str(stock_symbol)
    url = 'https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol={}&apikey=K3VUGXJ70ADU01J0'.format(
        str_stk)
    url2 = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol={}&apikey=K3VUGXJ70ADU01J0'.format(
        str_stk)
    r = requests.get(url)
    r2 = requests.get(url2)
    data = r.json()
    data = data['annualReports']
    data = data[0]
    data2 = r2.json()
    data_all = {**data, **data2}
    return jsonify(data_all)


@app.route('/search', methods=['POST'])
def search():
    stock = request.get_json()
    stock_symbol = stock['search']
    stk = str(stock_symbol)
    url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords={}&apikey=K3VUGXJ70ADU01J0'.format(
        stk)
    r = requests.get(url)
    data = r.json()
    searchList = []
    for a in data["bestMatches"]:
        try:
            if(a.get("4. region") == 'United States' and a.get("3. type") == 'Equity'):
                searchList.append(a)
        except Exception:
            pass

    return jsonify(searchList)


@app.route('/getWalletBal', methods=["POST"])
def walletBal():
    wallet = request.get_json()
    ewallet = wallet["ewallet"]
    balance = getWalletBalance(ewallet)
    return jsonify({'balance': balance})


@app.route('/grade', methods=["POST"])
def Grade():
    return jsonify({'grade': Grade_calculate()})


@app.route('/status', methods=["POST"])
def Status():
    trans = request.get_json()
    status = trans["status"]
    id = trans["id"]
    metadata = trans["metadata"]
    handleFundsTransfer(id, status, metadata)
    return "Success"


@app.route('/user/<ewallet>/transaction', methods=["GET"])
def getTrans(ewallet):
    data = listWalletTransactions(ewallet)
    return jsonify(data)


@app.route('/transfer', methods=["POST"])
def transfer():
    amount = request.get_json().get("amount")
    source = request.get_json().get("source_ewallet")
    dest = request.get_json().get("dest")
    desc = request.get_json().get("desc")
    user = Useremail(dest)
    autoAccept(amount, source, user[0].get("ewallet_id"), desc)


@app.route('/createPayment', methods=["POST"])
def createPay():
    ewallet = request.get_json().get("ewallet")
    user = Useremail(ewallet)
    createPayment(ewallet=ewallet)


@app.route('/loadCard', methods=["POST"])
def loadCard():
    ewallet = request.get_json().get("ewallet")
    card_id = getUser(ewallet)[0].get('card_id')
    results = getCard(card_id)
    return results
