import tornado.websocket
import tornado.web
import tornado.ioloop
import logging
import Utils
import json
# import threading
import time
from tornado.options import define, options


class MainSocketHandler(tornado.websocket.WebSocketHandler):

    clients = {}  # 用于存放WebSocket连接

    def check_origin(self, origin):  # 允许跨域
        return True

    def open(self):  # WebSocket建立时调用
        openid = Utils.getOpenid(self.get_argument("code"))
        if openid == "noopenid":
            self.close()
        else:
            self.openid = openid
            MainSocketHandler.clients[openid] = {"openid": openid, "object": self}
            logging.info("User {0} connected".format(openid))

    def on_close(self):  # WebSocket断开连接时调用
        try:
            if self.openid in MainSocketHandler.clients:
                del MainSocketHandler.clients[self.openid]
                logging.info("User {0} disconnected".format(self.openid))
        except:
            pass

    def on_message(self, message):  # 收到WebSocket消息时调用
        data = json.loads(message)
        # logging.info("Get message from {0} => {1}".format(self.openid, message))
        action = data['msg']
        obj = data['obj']
        if action == "nothing":  # 测试命令
            Utils.sendMsg(self, "nothing", "Hello Socket")
        elif action == "updateUserInfo":  # 更新用户信息
            Utils.updateUserInfo(self, obj)
        elif action == "getHome":  # 得到主页信息
            Utils.getHome(self)
        elif action == "getMyInfo":  # 得到自己信息
            Utils.getMyInfo(self)
        elif action == "getUserinfo":  # 得到用户信息
            Utils.getUserinfo(self, obj)
        elif action == "getInfo":  # 得到公告
            Utils.getInfo(self)
        elif action == "addInfo":  # 发布公告
            Utils.insertInfo(self, obj)
        elif action == "delInfo":  # 删除公告
            Utils.deleteInfo(self, obj)
        elif action == "getFile":  # 得到文件
            Utils.getFile(self)
        elif action == "addTask":  # 发布任务
            Utils.insertTask(self, obj)
        elif action == "getDep":  # 得到部门
            Utils.getDep(self)
        elif action == "addDep":  # 添加部门
            Utils.insertDep(self, obj)
        elif action == "getPos":  # 得到职位
            Utils.getPos(self)
        elif action == "addPos":  # 添加职位
            Utils.insertPos(self, obj)
        elif action == "getUsers":  # 得到部门架构
            Utils.getUsers(self)
        elif action == "getTask":  # 得到任务大厅
            Utils.getTask(self)
        elif action == "getMyTask":  # 得到我的任务
            Utils.getMyTask(self)
        elif action == "buyTask":  # 领取任务
            Utils.buyTask(self, obj)
        elif action == "getThisTask":  # 得到任务详情
            Utils.getThisTask(self, obj)
        elif action == "doTask":  # 做任务
            Utils.doTask(self, obj)
        elif action == "checkTask":  # 检查任务
            Utils.checkTask(self, obj)
        elif action == "getCheckTask":  # 得到检查的任务
            Utils.getCheckTask(self)
        elif action == "getThisCheckTask":  # 得到要检查的任务详情
            Utils.getThisCheckTask(self, obj)
        elif action == "getUserlist":  # 得到用户列表
            Utils.getUserlist(self, obj)
        elif action == "updateUserDP":  # 更新用户信息
            Utils.updateUserDP(self, obj)
        elif action == "addFriend":  # 添加好友
            Utils.addFriend(self, obj)
        elif action == "sendMessage":  # 发送消息
            Utils.sendMessage(self, obj, MainSocketHandler.clients)
        elif action == "getFriends":  # 得到通讯录
            Utils.getFriends(self)
        elif action == "getMessages":  # 得到消息列表
            Utils.getMessages(self)
        elif action == "getAllMessage":  # 得到所有消息
            Utils.getAllMessage(self, obj)
        



def main():
    logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s')
    define("port", default=8888, type=int)
    define("host", default="0.0.0.0", type=str)
    app = tornado.web.Application([(r"/", MainSocketHandler)])
    app.listen(options.port, options.host)
    # threading.Thread(target=info).start()
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    main()
