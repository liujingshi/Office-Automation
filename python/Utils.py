
import requests
import json
import logging
from ljsmysql import Ljsmysql
import time
from common import JsonToDatetime
import shutil

Ljsmysql.connect()


# appid
def AppID():
    return "wx9097c11448b32173"


# secret
def AppSecret():
    return "7f767f014820e5d300a2d3e3732f4171"


# 获取openid
def getOpenid(code):
    url = "https://api.weixin.qq.com/sns/jscode2session?appid={0}&secret={1}&js_code={2}&grant_type=authorization_code".format(
        AppID(), AppSecret(), code
    )
    res = requests.get(url)
    openid = res.json().get('openid')
    # session_key = res.json().get('session_key')
    return openid


# 发送的信息格式
def sendMsg(tornadoSelf, msg, obj = ""):
    message = json.dumps({
        "msg": msg,
        "obj": obj
    }, cls=JsonToDatetime)
    tornadoSelf.write_message(message)
    logging.info("Send meaage to {0} => {1}".format(tornadoSelf.openid, message))


# 更新用户信息
def updateUserInfo(tornadoSelf, data):
    openid = tornadoSelf.openid
    Ljsmysql.table("user").where("open_id", openid).update(data)


# 获取最新公告
def getNewInfo(tornadoSelf):
    info = Ljsmysql.table("info").order("info_datetime desc").select()
    if len(info) > 0:
        sendMsg(tornadoSelf, "newInfo", "{0} - {1}".format(info[0]['info_title'], info[0]['info_datetime']))
    else:
        sendMsg(tornadoSelf, "newInfo", "暂无公告")


# 获取公告
def getInfo(tornadoSelf):
    info = Ljsmysql.table("info").order("info_datetime desc").select()
    sendMsg(tornadoSelf, "info", info)


# 插入公告
def insertInfo(tornadoSelf, obj):
    datetime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    user = Ljsmysql.table("user").where("open_id", tornadoSelf.openid).select()
    obj['user_id'] = user[0]['user_id']
    obj['info_datetime'] = datetime
    Ljsmysql.table("info").insert(obj)
    sendMsg(tornadoSelf, "addInfoSuccess")


# 删除公告
def deleteInfo(tornadoSelf, obj):
    infoId = obj['info_id']
    Ljsmysql.table("info").where("info_id", infoId).delete()
    sendMsg(tornadoSelf, "delInfoSuccess")


# 获取文件列表
def getFile(tornadoSelf):
    files = Ljsmysql.table("file").order("file_id desc").select()
    sendMsg(tornadoSelf, "files", files)


# 发布任务
def insertTask(tornadoSelf, obj):
    user = Ljsmysql.table("user").where("open_id", tornadoSelf.openid).select()
    obj['from_user_id'] = user[0]['user_id']
    Ljsmysql.table("task").insert(obj)
    sendMsg(tornadoSelf, "addTaskSuccess")
