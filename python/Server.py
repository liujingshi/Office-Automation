import tornado.websocket
import tornado.web
import tornado.ioloop
import logging
import Utils
import json
import threading
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
        if action == "nothing":
            Utils.sendMsg(self, "nothing", "Hello Socket")
        elif action == "updateUserInfo":
            Utils.updateUserInfo(self, obj)
        elif action == "getHome":
            Utils.getHome(self)
        elif action == "getInfo":
            Utils.getInfo(self)
        elif action == "addInfo":
            Utils.insertInfo(self, obj)
        elif action == "delInfo":
            Utils.deleteInfo(self, obj)
        elif action == "getFile":
            Utils.getFile(self)
        elif action == "addTask":
            Utils.insertTask(self, obj)
        elif action == "getDep":
            Utils.getDep(self)
        elif action == "addDep":
            Utils.insertDep(self, obj)
        elif action == "getPos":
            Utils.getPos(self)
        elif action == "addPos":
            Utils.insertPos(self, obj)
        elif action == "getUsers":
            Utils.getUsers(self)
        elif action == "getTask":
            Utils.getTask(self)
        elif action == "getMyTask":
            Utils.getMyTask(self)
        elif action == "buyTask":
            Utils.buyTask(self, obj)
        elif action == "getThisTask":
            Utils.getThisTask(self, obj)
        elif action == "doTask":
            Utils.doTask(self, obj)
        elif action == "checkTask":
            Utils.checkTask(self, obj)
        elif action == "getCheckTask":
            Utils.getCheckTask(self)
        elif action == "getThisCheckTask":
            Utils.getThisCheckTask(self, obj)
        elif action == "getUserlist":
            Utils.getUserlist(self, obj)
        elif action == "updateUserDP":
            Utils.updateUserDP(self, obj)
        



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
