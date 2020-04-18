
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
    errcode = res.json().get("errcode")
    # print(errcode)
    if errcode == 0 or errcode is None:
        openid = res.json().get('openid')
        # session_key = res.json().get('session_key')
        lookUser(openid)
        return openid
    else:
        return "noopenid"


# 查看用户是否存在
def lookUser(openid):
    if not Ljsmysql.table("user").where("open_id", openid).find():
        Ljsmysql.table("user").insert({
            "open_id": openid,
            "user_name": "USER{0}".format(int(time.time()))
        })


# 发送的信息格式
def sendMsg(tornadoSelf, msg, obj = ""):
    message = json.dumps({
        "msg": msg,
        "obj": obj
    }, cls=JsonToDatetime)
    tornadoSelf.write_message(message)
    # logging.info("Send meaage to {0} => {1}".format(tornadoSelf.openid, message))


# 得到自己的信息
def getMyInfo(tornadoSelf):
    dbData = Ljsmysql.table("user").where("open_id", tornadoSelf.openid).select()
    if len(dbData) > 0:
        sendMsg(tornadoSelf, "myUserinfo", dbData[0])


# 得到用户信息
def getUserinfo(tornadoSelf, obj):
    dbData = Ljsmysql.table("user").where("user_id", obj['user_id']).select()
    if len(dbData) > 0:
        sendMsg(tornadoSelf, "userinfo", dbData[0])


# 得到主页信息
def getHome(tornadoSelf):
    openid = tornadoSelf.openid
    user = Ljsmysql.table("user").where("open_id", openid).select()
    if len(user) > 0:
        userid = user[0]['user_id']
        power = user[0]['power_level']
        msgnum = len(Ljsmysql.table("msg").where({"to_user_id": userid, "msg_read": 0}).select())
        if msgnum == 0:
            msgnum = ""
        mytasknum = len(Ljsmysql.table("task").where([["user_id", userid], ["task_status_no", "<>", 3]]).select())
        if mytasknum == 0:
            mytasknum = ""
        mychecktasknum = len(Ljsmysql.table("task").where([["from_user_id", userid], ["task_status_no", 2]]).select())
        if mychecktasknum == 0:
            mychecktasknum = ""
        tasknum = len(Ljsmysql.table("task").where("task_status_no", "<", 1).select())
        if tasknum == 0:
            tasknum = ""
        homeGrid = [{
                "text": "消息",
                "icon": "chat-o",
                "info": msgnum,
                "url": "/pages/message/message"
            },
            {
                "text": "通讯录",
                "icon": "friends-o",
                "info": "",
                "url": "/pages/friends/friends"
            },
            {
                "text": "人员架构",
                "icon": "cluster-o",
                "info": "",
                "url": "/pages/users/users"
            },
            {
                "text": "公告",
                "icon": "volume-o",
                "info": "",
                "url": "/pages/info/info"
            },
            {
                "text": "我的任务",
                "icon": "todo-list-o",
                "info": mytasknum,
                "url": "/pages/task/task"
            },
            {
                "text": "任务大厅",
                "icon": "notes-o",
                "info": tasknum,
                "url": "/pages/taskstore/taskstore"
            }
        ]
        if power > 0:
            homeGrid += [{
                    "text": "发布公告",
                    "icon": "volume",
                    "info": "",
                    "url": "/pages/addinfo/addinfo"
                },
                {
                    "text": "发布任务",
                    "icon": "todo-list",
                    "info": "",
                    "url": "/pages/addtask/addtask"
                },
                {
                    "text": "检查任务",
                    "icon": "column",
                    "info": mychecktasknum,
                    "url": "/pages/checktask/checktask"
                }
            ]
        if power > 1:
            homeGrid += [{
                    "text": "新增部门",
                    "icon": "wap-home",
                    "info": "",
                    "url": "/pages/adddep/adddep"
                },
                {
                    "text": "新增职位",
                    "icon": "manager",
                    "info": "",
                    "url": "/pages/addpos/addpos"
                },
                {
                    "text": "文件上传",
                    "icon": "upgrade",
                    "info": "",
                    "url": "/pages/upload/upload"
                },
                {
                    "text": "文件下载",
                    "icon": "down",
                    "info": "",
                    "url": "/pages/download/download"
                }
            ]
        dbData = {
            "grid": homeGrid,
            "newinfo": getNewInfo()
        }
        sendMsg(tornadoSelf, "home", dbData)


# 更新用户信息
def updateUserInfo(tornadoSelf, data):
    openid = tornadoSelf.openid
    Ljsmysql.table("user").where("open_id", openid).update(data)


# 获取最新公告
def getNewInfo():
    info = Ljsmysql.table("info").order("info_datetime desc").select()
    if len(info) > 0:
        return "{0} - {1}".format(info[0]['info_title'], info[0]['info_datetime'])
    else:
        return "暂无公告"


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


# 获取部门
def getDep(tornadoSelf):
    dep = Ljsmysql.table("dep").order("dep_id desc").select()
    sendMsg(tornadoSelf, "dep", dep)


# 添加部门
def insertDep(tornadoSelf, obj):
    Ljsmysql.table("dep").insert(obj)
    sendMsg(tornadoSelf, "addDepSuccess")


# 获取职位
def getPos(tornadoSelf):
    dbData = Ljsmysql.table("pos").order("pos_id desc").select()
    sendMsg(tornadoSelf, "pos", dbData)


# 添加职位
def insertPos(tornadoSelf, obj):
    Ljsmysql.table("pos").insert(obj)
    sendMsg(tornadoSelf, "addPosSuccess")


# 获取人员架构
def getUsers(tornadoSelf):
    dbData = getUserDG(1)
    sendMsg(tornadoSelf, "users", dbData)


# 获取用户列表
def getUserlist(tornadoSelf, obj):
    sql = "select * from user, pos where user.pos_id = pos.pos_id and "
    sql += "user.dep_id = {0} order by user.user_id desc".format(obj['dep_id'])
    dbData = Ljsmysql.query(sql)
    sendMsg(tornadoSelf, "userlist", dbData)


# 修改用户部门以及职业
def updateUserDP(tornadoSelf, obj):
    Ljsmysql.table("user").where("user_id", obj['user_id']).update({
        "dep_id": obj['dep_id'],
        "pos_id": obj['pos_id'],
        "user_name": obj['user_name']
    })
    sendMsg(tornadoSelf, "updateUserinfoSuccess")


# 递归获取人员架构
def getUserDG(id):
    deps = getDepByUpId(id)
    data = []
    for dep in deps:
        data.append({
            "id": dep['dep_id'],
            "name": dep['dep_name'],
            "children": getUserDG(dep['dep_id'])
        })
    return data


# 通过上级id获取部门
def getDepByUpId(upId):
    deps = Ljsmysql.table("dep").where("up_dep_id", upId).select()
    return deps


# 获取任务
def getTask(tornadoSelf):
    sql = "select * from task, task_status stu, user where "
    sql += "task.task_status_no = stu.task_status_no and task.from_user_id = user.user_id and task.task_status_no = 0 "
    sql += "order by task.task_id desc"
    dbData = Ljsmysql.query(sql)
    sendMsg(tornadoSelf, "task", dbData)


# 获取我的任务
def getMyTask(tornadoSelf):
    openid = tornadoSelf.openid
    user = Ljsmysql.table("user").where("open_id", openid).select()
    if len(user) > 0:
        userid = user[0]['user_id']
        sql = "select * from task, task_status stu, user, file where "
        sql += "task.task_file_id = file.file_id and task.task_status_no = stu.task_status_no and task.from_user_id = user.user_id and "
        sql += "task.task_status_no > 0 and task.user_id = '{0}' ".format(userid)
        sql += "order by task.task_id desc"
        dbData = Ljsmysql.query(sql)
        if not isinstance(dbData, list):
            dbData = list(dbData)
        sql = "select * from task, task_status stu, user where "
        sql += "task.task_file_id = 0 and task.task_status_no = stu.task_status_no and task.from_user_id = user.user_id and "
        sql += "task.task_status_no > 0 and task.user_id = '{0}' ".format(userid)
        sql += "order by task.task_id desc"
        dbData += Ljsmysql.query(sql)
        sendMsg(tornadoSelf, "mytask", dbData)


# 领取任务
def buyTask(tornadoSelf, obj):
    openid = tornadoSelf.openid
    user = Ljsmysql.table("user").where("open_id", openid).select()
    if len(user) > 0:
        userid = user[0]['user_id']
        Ljsmysql.table("task").where(obj).update({"user_id": userid, "task_status_no": 1})
        sendMsg(tornadoSelf, "buyTaskSuccess")


# 获取我的任务
def getThisTask(tornadoSelf, obj):
    openid = tornadoSelf.openid
    user = Ljsmysql.table("user").where("open_id", openid).select()
    if len(user) > 0:
        userid = user[0]['user_id']
        sql = "select * from task, task_status stu, user, file where "
        sql += "task.task_file_id = file.file_id and task.task_status_no = stu.task_status_no and task.from_user_id = user.user_id and "
        sql += "task.task_id = '{0}' and task.task_status_no > 0 and task.user_id = '{1}' ".format(obj['task_id'], userid)
        sql += "order by task.task_id desc"
        dbData = Ljsmysql.query(sql)
        sql = "select * from task, task_status stu, user where "
        sql += "task.task_file_id = 0 and task.task_status_no = stu.task_status_no and task.from_user_id = user.user_id and "
        sql += "task.task_id = '{0}' and task.task_status_no > 0 and task.user_id = '{1}' ".format(obj['task_id'], userid)
        sql += "order by task.task_id desc"
        if not isinstance(dbData, list):
            dbData = list(dbData)
        dbData += Ljsmysql.query(sql)
        if len(dbData) > 0:
            sendMsg(tornadoSelf, "thisTask", dbData[0])


# 做任务
def doTask(tornadoSelf, obj):
    Ljsmysql.table("task").where("task_id", obj['task_id']).update({
        "task_status_no": 2,
        "task_ok_text": obj['task_ok_text'],
        "task_ok_file_id": obj['task_ok_file_id']
    })
    sendMsg(tornadoSelf, "doTaskSuccess")


# 检查任务
def checkTask(tornadoSelf, obj):
    Ljsmysql.table("task").where("task_id", obj['task_id']).update({
        "task_status_no": obj['task_status_no'],
        "task_text": obj['task_text']
    })
    sendMsg(tornadoSelf, "checkTaskSuccess")


# 获取检查任务
def getCheckTask(tornadoSelf):
    openid = tornadoSelf.openid
    user = Ljsmysql.table("user").where("open_id", openid).select()
    if len(user) > 0:
        userid = user[0]['user_id']
        sql = "select * from task, task_status stu, user where "
        sql += "task.task_status_no = stu.task_status_no and task.user_id = user.user_id and "
        sql += "task.task_status_no = 2 and task.from_user_id = '{0}' ".format(userid)
        sql += "order by task.task_id desc"
        dbData = Ljsmysql.query(sql)
        sendMsg(tornadoSelf, "checkTask", dbData)


# 获取检查任务
def getThisCheckTask(tornadoSelf, obj):
    openid = tornadoSelf.openid
    user = Ljsmysql.table("user").where("open_id", openid).select()
    if len(user) > 0:
        userid = user[0]['user_id']
        sql = "select * from task, task_status stu, user, file where "
        sql += "task.task_ok_file_id = file.file_id and task.task_status_no = stu.task_status_no and task.user_id = user.user_id and "
        sql += "task.task_id = '{0}' and task.task_status_no = 2 and task.from_user_id = '{1}' ".format(obj['task_id'], userid)
        sql += "order by task.task_id desc"
        dbData = Ljsmysql.query(sql)
        sql = "select * from task, task_status stu, user where "
        sql += "task.task_ok_file_id = 0 and task.task_status_no = stu.task_status_no and task.user_id = user.user_id and "
        sql += "task.task_id = '{0}' and task.task_status_no = 2 and task.from_user_id = '{1}' ".format(obj['task_id'], userid)
        sql += "order by task.task_id desc"
        if not isinstance(dbData, list):
            dbData = list(dbData)
        dbData += Ljsmysql.query(sql)
        if len(dbData) > 0:
            sendMsg(tornadoSelf, "thisCheckTask", dbData[0])


# 添加好友
def addFriend(tornadoSelf, obj):
    openid = tornadoSelf.openid
    user = Ljsmysql.table("user").where("open_id", openid).select()
    if len(user) > 0:
        userid = user[0]['user_id']
        Ljsmysql.table("cont").insert({
            "user_id": userid,
            "cont_user_id": obj['friendid']
        })
        sendMsg(tornadoSelf, "addFriendSuccess")


# 发送消息
def sendMessage(tornadoSelf, obj, clients):
    openid = tornadoSelf.openid
    user = Ljsmysql.table("user").where("open_id", openid).select()
    if len(user) > 0:
        fromuserid = user[0]['user_id']
        touser = Ljsmysql.table("user").where("user_id", obj['user_id']).select()
        if len(touser) > 0:
            toUserOpenid = touser[0]['open_id']
            Ljsmysql.table("msg").insert({
                "from_user_id": fromuserid,
                "to_user_id": obj['user_id'],
                "msg_text": obj['text'],
                "msg_datetime": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
            })
            if toUserOpenid in clients.keys():
                sendMsg(clients[toUserOpenid]['object'], "reMessage", obj['text'])
            sendMsg(tornadoSelf, "sendMessageSuccess")
        

# 获取好友列表
def getFriends(tornadoSelf):
    openid = tornadoSelf.openid
    user = Ljsmysql.table("user").where("open_id", openid).select()
    if len(user) > 0:
        userid = user[0]['user_id']
        sql = "select * from cont, user where cont.cont_user_id = user.user_id and "
        sql += "cont.user_id = {0} order by cont.cont_id desc".format(userid)
        dbData = Ljsmysql.query(sql)
        sendMsg(tornadoSelf, "friends", dbData)


# 获取消息列表
def getMessages(tornadoSelf):
    openid = tornadoSelf.openid
    user = Ljsmysql.table("user").where("open_id", openid).select()
    if len(user) > 0:
        userid = user[0]['user_id']
        sql = "select user.user_name as name, user.user_head as head, msg.from_user_id as userid, count(msg.from_user_id) as num, max(msg.msg_datetime) as dt from msg, user "
        sql += "where msg.to_user_id = {0} and msg.msg_read = 0 and ".format(userid)
        sql += "user.user_id = msg.from_user_id "
        sql += "group by msg.from_user_id order by dt desc"
        dbData = Ljsmysql.query(sql)
        sendMsg(tornadoSelf, "messages", dbData)


# 获取所有消息
def getAllMessage(tornadoSelf, obj):
    openid = tornadoSelf.openid
    user = Ljsmysql.table("user").where("open_id", openid).select()
    if len(user) > 0:
        userid = user[0]['user_id']
        sql = "select * from msg, user where msg.from_user_id = user.user_id and "
        sql += "((msg.from_user_id = {0} and msg.to_user_id = {1}) or (msg.from_user_id = {1} and msg.to_user_id = {0})) ".format(userid, obj['userid'])
        sql += "order by msg.msg_datetime"
        dbData = Ljsmysql.query(sql)
        Ljsmysql.table("msg").where({
            "from_user_id": obj['userid'],
            "to_user_id": userid
        }).update({"msg_read": 1})
        sendMsg(tornadoSelf, "allMessage", dbData)
