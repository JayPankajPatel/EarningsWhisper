from backend import db, app
import routes
if __name__ == '__main__':
    db.create_all()
    app.run(host='192.168.1.21', port=3000)
