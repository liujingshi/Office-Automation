// pages/message/message.js
const app = getApp()

Page({

    data: {
        message: []
    },

    onLoad: function (options) {

    },

    onShow: function () {
        wx.onSocketMessage((result) => {
            this.onSocketMsg(JSON.parse(result.data))
        })
        app.sendSocketMsg("getMessages")
    },
    chat: function (e) {
        wx.navigateTo({
            url: '/pages/chat/chat?userid=' + e.currentTarget.dataset.userid
        })
    },
    onSocketMsg: function (data) {
        let msg = data.msg;
        let obj = data.obj;
        if (msg == "messages") {
            this.setData({
                message: obj
            })
        } else if (msg == "reMessage") {
            app.sendSocketMsg("getMessages")
        }
    }

})