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
