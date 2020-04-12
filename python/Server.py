import tornado.websocket
import tornado.web
import tornado.ioloop
import logging
from tornado.options import define, options


class OaSocketHandler(tornado.websocket.WebSocketHandler):

    clients = set()  # 用于存放WebSocket连接

    def check_origin(self, origin):  # 允许跨域
        return True

    def open(self):  # WebSocket建立时调用
        logging.info("New user connected")
        OaSocketHandler.clients.add(self)

    def on_close(self):  # WebSocket断开连接时调用
        logging.info("One user disconnected")
        OaSocketHandler.clients.remove(self)

    def on_message(self, message):  # 收到WebSocket消息时调用
        logging.info("getMessage:{0}".format(message))
        self.write_message("Hello Socket")



def main():
    logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s')
    define("port", default=8888, help="run on the given port", type=int)
    define("host", default="0.0.0.0", help="run on the given host", type=str)
    app = tornado.web.Application([(r"/", OaSocketHandler)])
    app.listen(options.port, options.host)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    main()
