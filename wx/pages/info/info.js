// pages/info/info.js
const app = getApp()

Page({

    data: {
        info: []
    },

    onLoad: function (options) {
        
    },

    onShow: function () {
        wx.onSocketMessage((result) => {
            this.onSocketMsg(JSON.parse(result.data))
        })
        app.sendSocketMsg("getInfo")
    },

    onSocketMsg: function (data) {
        let msg = data.msg;
        let obj = data.obj;
        if (msg == "info") {
            this.setData({
                info: obj
            })
        }
    }
})