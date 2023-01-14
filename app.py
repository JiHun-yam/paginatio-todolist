from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

import requests


from pymongo import MongoClient
import certifi

#
ca = certifi.where()
client = MongoClient('mongodb+srv://test:sparta@cluster0.2caednd.mongodb.net/Cluster0?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta


@app.route('/')
def home():
    return render_template('index.html')


@app.route("/add", methods=["POST"])
def add_list():
    text_receive = request.form['text_give']
    count = list(db.page.find({}, {'_id': False}))
    num = len(count) + 1
    doc = {
        'num': num,
        'text': text_receive,
    }

    db.page.insert_one(doc)
    return jsonify({'msg': '저장완료!'})


@app.route("/show", methods=["GET"])
def list_get():
    page_list = list(db.page.find({}, {'_id': False}))
    # page_list.reverse()
    return jsonify({'page': page_list})






if __name__ == '__main__':
    app.run('0.0.0.0', port=5410, debug=True)