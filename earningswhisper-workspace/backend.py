from setup import Flask, SQLAlchemy, Marshmallow

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
    contact_id = db.Column(db.String(220), unique=False)
    card_id = db.Column(db.String(220), unique=False)
    userPortfolio = db.relationship(
        'Stock', secondary=UserStock, backref=db.backref('buyers', lazy='dynamic'))

    def __init__(self, username, fname, lname, birthdate, email, phone, address, zipcode, city, state, country, password, question, answer, ewallet_id, contact_id, card_id):
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
        self.contact_id = contact_id
        self.card_id = card_id


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
