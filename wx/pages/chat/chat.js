// pages/chat/chat.js
const app = getApp()

Page({

    data: {
        user_id: 0,
        message: [],
        msg: "",
        userhead: ""
    },

    onLoad: function (options) {
        this.setData({
            user_id: options.userid,
            userhead: app.globalData.userInfoServer.user_head
        })
    },

    onShow: function () {
        wx.onSocketMessage((result) => {
            this.onSocketMsg(JSON.parse(result.data))
        })
        app.sendSocketMsg("getAllMessage", {userid: this.data.user_id})
    },
    setMsg: function (event) {
        this.setData({
            msg: event.detail
        })
    },
    gotoLast: function () {
        this.setData({
            now_id: "M" + this.data.message[this.data.message.length-1].msg_id
        })
    },
    send: function () {
        app.sendSocketMsg("sendMessage", {
            user_id: this.data.user_id,
            text: this.data.msg
        })
        this.setData({
            msg: ""
        })
    },
    onSocketMsg: function (data) {
        let msg = data.msg;
        let obj = data.obj;
        if (msg == "allMessage") {
            this.setData({
                message: obj
            })
            this.gotoLast()
        } else if (msg == "sendMessageSuccess") {
            app.sendSocketMsg("getAllMessage", {userid: this.data.user_id})
        } else if (msg == "reMessage") {
            app.sendSocketMsg("getAllMessage", {userid: this.data.user_id})
        }
    }
  
})