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

# 입력을 하면 값을 DB에 저장한다
@app.route("/add", methods=["POST"])
def add_list():
    text_receive = request.form['text_give']
    count = list(db.page.find({}, {'_id': False}))
    num = len(count) + 1
    done_receive = request.form['done_give']
    doc = {
        'num': num,
        'text': text_receive,
        'done': done_receive,
    }

    db.page.insert_one(doc)
    return jsonify({'msg': '저장완료!'})

# DB에 가지고 있는 값을 보낸다
@app.route("/show", methods=["GET"])
def list_get():
    page_list = list(db.page.find({}, {'_id': False}))
    # page_list.reverse()
    return jsonify({'page': page_list})

# 완료기능
@app.route("/done", methods=["POST"])
def done_post():
    num_receive = request.form['num_give']
    db.page.update_one({'num': int(num_receive)}, {'$set': {'done': 1}})
    return jsonify({'msg': '할일 끝!'})

@app.route("/done/cancel", methods=["POST"])
def bucket_cancel():
    num_receive = request.form['num_give']
    db.page.update_one({'num': int(num_receive)}, {'$set': {'done': 0}})
    return jsonify({'msg': '다시 도전!'})

#




# 삭제기능
@app.route("/delete", methods=["POST"])
def delete_list():
    num_receive = request.form['num_give']
    db.page.delete_one({'num': int(num_receive)})

    return jsonify({'msg': '삭제완료'})



if __name__ == '__main__':
    app.run('0.0.0.0', port=5410, debug=True)