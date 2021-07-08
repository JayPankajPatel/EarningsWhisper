from yahoo_earnings_calendar import YahooEarningsCalendar
from datetime import datetime, timedelta
import numpy as np
from sklearn.linear_model import LinearRegression
import requests
import csv
from flask import request
from transferresponse import handleFundsTransfer
from collect import createTransferBetweenWallets, createPayment
from wallet import createPersonalWallet, getWalletBalance, createCard, activateCard, setPinCode, getCard
from listtransactions import listWalletTransactions
from backend import Users, UsersSchema


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
        start = week[0].strftime('%b %d %Y %I:%M%p')
        end = week[1].strftime('%b %d %Y %I:%M%p')
        date_from = datetime.strptime(start, '%b %d %Y %I:%M%p')
        date_to = datetime.strptime(end, '%b %d %Y %I:%M%p')
        yec = YahooEarningsCalendar()
        earnings = yec.earnings_between(date_from, date_to)
        term = start + ' ----- ' + end
        earnings.append(term)
        earningsWeek = {'time': earnings}
        earningsWeeks.append(earningsWeek)

    return earningsWeeks


def sortDate(val):
    return val[2]

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
            point_value = 15
            if up < low:
                point_value = 25
            else:
                point_value = 10
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
        point_value = 25
    elif (count_70 >= sometimes and count_70 < often):
        point_value = 15
    elif (count_70 >= rarely and count_70 < sometimes):
        point_value = 10
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

    try:
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
            point_value = 15
            if(slope > rslope):
                point_value = 25
        elif (slope < 0):
            point_value = 10
        else:
            point_value = 5

    except Exception:
        point_value = 5

    return point_value


def OBV():
    stk = Stock_Symbol()
    url = 'https://www.alphavantage.co/query?function=OBV&symbol={}&interval=5min&apikey=K3VUGXJ70ADU01J0%27'.format(
        stk)
    r = requests.get(url)
    data = r.json()
    a = "Technical Analysis: OBV"
    b = "OBV"
    OBV_values = Data_Values(data, a, TimeInterval(1), b)
    try:
        for a in range(len(OBV_values)):
            OBV_values[a] = float(OBV_values[a])
        avg = round(sum(OBV_values) / len(OBV_values), 3)
        if (OBV_values[-1] == OBV_values[-2]):
            point_value = 10
        elif (OBV_values[-1] > OBV_values[-2]):
            point_value = 20
        elif (OBV_values[-1] < OBV_values[-2]):
            point_value = 5
        if (OBV_values[-1] > avg):
            point_value += 5
    except Exception:
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

    Tuesday = Monday + timedelta(days=1)
    Wednesday = Monday + timedelta(days=2)
    Thursday = Monday + timedelta(days=3)
    Friday = Monday + timedelta(days=4)

    return [Monday, Tuesday, Wednesday, Thursday, Friday]


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
    dt = datetime.today() - timedelta(days=7)
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
    b = OBV()
    c = AD()
    d = BBands()

    total_points = a + b + c + d

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


def autoAccept(amount, source, dest, desc):
    id = createTransferBetweenWallets(amount, source, dest, desc)
    return handleFundsTransfer(id)


def Useremail(email):
    user = Users.query.filter_by(email=email)
    user_schema = UsersSchema(many=True)
    output = user_schema.dump(user)
    return output


def getUser(wallet):
    user = Users.query.filter_by(ewallet_id=wallet).all()
    user_schema = UsersSchema(many=True)
    output = user_schema.dump(user)
    return output
