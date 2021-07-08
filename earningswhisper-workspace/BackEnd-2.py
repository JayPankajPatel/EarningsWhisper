from flask import Flask, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask import request, jsonify
from flask_marshmallow import Marshmallow
from yahoo_earnings_calendar import YahooEarningsCalendar
from datetime import datetime, timedelta
from datetime import date
import numpy as np
from sklearn.linear_model import LinearRegression
import math
import csv
import requests
from wallet import createPersonalWallet, getWalletBalance
from transferresponse import handleFundsTransfer
from listtransactions import listWalletTransactions
from collect import createTransferBetweenWallets

CSV_URL = 'https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&horizon=3month&apikey=K3VUGXJ70ADU01J0'
app = Flask("__name__")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql://mod:gabriel12@localhost:5432/backend'

db = SQLAlchemy(app)
ma = Marshmallow(app)

UserStock = db.Table('userstock',
                     db.Column('user_id', db.Integer,
                               db.ForeignKey('users.user_id')),
                     db.Column('stock_id', db.Integer,
                               db.ForeignKey('stock.stock_id'))
                     )


class Users(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=False)
    fname = db.Column(db.String(120), unique=False)
    lname = db.Column(db.String(120), unique=False)
    birthdate = db.Column(db.String(120), unique=False)
    email = db.Column(db.String(220), unique=False)
    phone = db.Column(db.String(120), unique=False)
    address = db.Column(db.String(120), unique=False)
    zipcode = db.Column(db.String(120), unique=False)
    city = db.Column(db.String(120), unique=False)
    state = db.Column(db.String(120), unique=False)
    country = db.Column(db.String(120), unique=False)
    password = db.Column(db.String(120), unique=False)
    question = db.Column(db.String(220), unique=False)
    answer = db.Column(db.String(220), unique=False)
    ewallet_id = db.Column(db.String(220), unique=False)
    userPortfolio = db.relationship(
        'Stock', secondary=UserStock, backref=db.backref('buyers', lazy='dynamic'))

    def __init__(self, username, fname, lname, birthdate, email, phone, address, zipcode, city, state, country, password, question, answer, ewallet_id):
        self.username = username
        self.fname = fname
        self.lname = lname
        self.birthdate = birthdate
        self.email = email
        self.phone = phone
        self.address = address
        self.zipcode = zipcode
        self.city = city
        self.state = state
        self.country = country
        self.password = password
        self.question = question
        self.answer = answer
        self.ewallet_id = ewallet_id


class Stock(db.Model):
    stock_id = db.Column(db.Integer, primary_key=True)
    stocksymbol = db.Column(db.String(10))

    def __init__(self, stocksymbol):
        self.stocksymbol = stocksymbol


class UsersSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Users
        load_instance = True


class StockSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Stock
        load_instance = True

# Earnings


def Convert(tup, di):
    di = dict(tup)
    return di


def Earnings(Monday, Friday, a):
    earningsWeeks = []
    for i in range(a):
        if (i != 0):
            Monday += timedelta(weeks=1)

            Friday += timedelta(weeks=1)

        week = [Monday, Friday]
        date_string1 = week[0].strftime('%b %d %Y %I:%M%p')
        date_string2 = week[1].strftime('%b %d %Y %I:%M%p')
        date_from = datetime.strptime(date_string1, '%b %d %Y %I:%M%p')
        date_to = datetime.strptime(date_string2, '%b %d %Y %I:%M%p')
        yec = YahooEarningsCalendar()
        earnings = yec.earnings_between(date_from, date_to)
        start = date_string1
        end = date_string2
        term = start + ' ----- ' + end
        earnings.append(term)
        earningsWeek = {'time': earnings}
        earningsWeeks.append(earningsWeek)

    return earningsWeeks

# Grade algo functions


def Price():
    stk = Stock_Symbol()
    url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={}&interval=5min&apikey=K3VUGXJ70ADU01J0%27'.format(
        stk)
    r = requests.get(url)
    data = r.json()
    a = "Time Series (5min)"
    b = "1. open"
    Prices = Data_Values(data, a, TimeInterval(0), b)
    return Prices


def BBands():
    stk = Stock_Symbol()
    url = 'https://www.alphavantage.co/query?function=BBANDS&symbol={}&interval=5min&time_period=5&series_type=close&nbdevup=3&nbdevdn=3&apikey=K3VUGXJ70ADU01J0%27'.format(
        stk)
    r = requests.get(url)
    data = r.json()
    a = "Technical Analysis: BBANDS"
    b = "Real Upper Band"
    c = "Real Lower Band"

    Upper_values = Data_Values(data, a, TimeInterval(1), b)
    Lower_values = Data_Values(data, a, TimeInterval(1), c)
    Diff_lst = []
    Diff_up_price = []
    Diff_low_price = []
    Price_lst = Price()
    for a in range(len(Upper_values)):
        if a % 10 == 0:
            Diff = round((float(Upper_values[a]) - float(Lower_values[a])), 3)
            Diff_lst.append(Diff)
    for a in range(len(Upper_values)):
        if a % 10 == 0:
            try:
                Diff1 = round(
                    (float(Upper_values[a]) - float(Price_lst[a])), 3)
                Diff_up_price.append(Diff1)
            except Exception:
                continue
    for a in range(len(Lower_values)):
        if a % 10 == 0:
            try:
                Diff1 = round(
                    (float(Price_lst[a]) - float(Lower_values[a])), 3)
                Diff_low_price.append(Diff1)
            except Exception:
                continue

    bband_info = []
    for a in range(len(Diff_lst)):
        try:
            avg_up_price = round(
                sum(Diff_up_price[0:a + 1]) / len(Diff_up_price[0:a + 1]), 3)
            avg_low_price = round(
                sum(Diff_low_price[0:a + 1]) / len(Diff_low_price[0:a + 1]), 3)
            avg_diff = round(
                sum(Diff_lst[0:a + 1]) / len(Diff_lst[0:a + 1]), 3)
            bband_info.append(avg_up_price)
            bband_info.append(avg_low_price)
            bband_info.append(avg_diff)
        except Exception:
            continue
    point_value = 0
    i = 3
    for a in range(len(bband_info)):
        if a % i == 0:
            breadth = bband_info[a] - bband_info[a - 3]
            up = bband_info[a - 2]
            low = bband_info[a - 1]
        if breadth > 0:
            point_value = 25
            if up < low:
                point_value = 33
            else:
                point_value = 15
        else:
            point_value = 5

    return point_value


def RSI():
    stk = Stock_Symbol()
    url = 'https://www.alphavantage.co/query?function=RSI&symbol={}&interval=5min&time_period=10&series_type=open&apikey=K3VUGXJ70ADU01J0%27'.format(
        stk)
    r = requests.get(url)
    data = r.json()
    a = "Technical Analysis: RSI"
    b = "RSI"
    RSI_values = Data_Values(data, a, TimeInterval(1), b)
    count_70 = 0
    often = len(RSI_values) / 2
    sometimes = len(RSI_values) / 3
    rarely = len(RSI_values) / 5
    point_value = 0
    for r in RSI_values:
        if (float(r) > 30):
            if (float(r) >= 70):
                count_70 += 1
        else:
            point_value = 0
    if (count_70 >= often):
        point_value = 33
    elif (count_70 >= sometimes and count_70 < often):
        point_value = 25
    elif (count_70 >= rarely and count_70 < sometimes):
        point_value = 15
    else:
        point_value = 5

    return point_value


def AD():
    stk = Stock_Symbol()
    url = 'https://www.alphavantage.co/query?function=AD&symbol={}&interval=5min&apikey=K3VUGXJ70ADU01J0%27'.format(
        stk)
    r = requests.get(url)
    data = r.json()
    a = "Technical Analysis: Chaikin A/D"
    b = 'Chaikin A/D'
    AD_values = Data_Values(data, a, TimeInterval(1), b)
    for a in range(0, len(AD_values)):
        AD_values[a] = float(AD_values[a])

    Min_value = min(AD_values)
    Max_value = max(AD_values)
    Min_value_index = AD_values.index(min(AD_values))
    Max_value_index = AD_values.index(max(AD_values))
    if (Max_value_index > Max_value_index):
        slope = round((Max_value - Min_value) /
                      (Max_value_index - Min_value_index), 2)
    else:
        slope = round((Min_value - Max_value) /
                      (Min_value_index - Max_value_index), 2)

    x = np.array(range(0, len(AD_values))).reshape((-1, 1))
    y = np.array(AD_values)
    model = LinearRegression()
    model.fit(x, y)
    model = LinearRegression().fit(x, y)
    rslope = model.coef_
    rslope = round(float(rslope), 2)

    if (slope > 0):
        point_value = 20
        if(slope > rslope):
            point_value = 33
    elif (slope < 0):
        point_value = 5
    else:
        point_value = 5

    return point_value


def Stock_Symbol():
    stock = request.get_json()
    stock_symbol = stock['stocksymbol']
    stk = str(stock_symbol)
    return stk


def Term():
    today = datetime.today()
    n = today.weekday()

    if n > 4:
        Monday = today + timedelta(days=7-n)
    else:
        Monday = today - timedelta(n)

    Friday = Monday + timedelta(days=4)

    return [Monday, Friday]


def Data_Values(data, a, times, b):
    data_lst = []
    for time in times:
        try:
            data_hour = data[a][time][b]
            data_lst.append(data_hour)
        except Exception:
            pass
    return data_lst


def TimeInterval(a):
    dt = datetime.today() - timedelta(days=3)
    date = dt.replace(hour=6, minute=0, second=0)
    times = []
    for _ in range(121):
        date += timedelta(minutes=5)
        if (a == 1):
            time = date.strftime('%Y-%m-%d %H:%M')
            times.append(time)
        else:
            time = date.strftime('%Y-%m-%d %H:%M:%S')
            times.append(time)
    return times


def Grade_calculate():
    a = RSI()
    c = AD()
    d = BBands()

    total_points = a + c + d

    if (total_points <= 25):
        grade = 'F'
    elif (total_points > 25 and total_points <= 50):
        grade = 'D'
    elif (total_points > 50 and total_points <= 65):
        grade = 'C'
    elif (total_points > 65 and total_points <= 85):
        grade = 'B'
    elif (total_points > 85 and total_points <= 100):
        grade = 'A'

    return grade


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

    ewallet_id = createPersonalWallet(fname, lname, birthdate, email, phone, address,
                                      zipcode, city, state, country)

    user = Users(username, fname, lname, birthdate, email, phone, address,
                 zipcode, city, state, country, password, question, answer, ewallet_id)

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
    user = Users.query.filter_by(ewallet_id=id).all()
    user_schema = UsersSchema(many=True)
    output = user_schema.dump(user)
    return jsonify({'user': output})


def Useremail(email):
    user = Users.query.filter_by(email=email)
    user_schema = UsersSchema(many=True)
    output = user_schema.dump(user)
    return output


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
    balance = getWalletBalance(ewallet)["data"]
    return jsonify(balance["data"].get("balance"))


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


def autoAccept(amount, source, dest, desc):
    id = createTransferBetweenWallets(amount, source, dest, desc)
    return handleFundsTransfer(id)


if __name__ == '__main__':
    db.create_all()
    app.run(host='192.168.1.21', port=3000)
