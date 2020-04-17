// pages/home/home.js
const app = getApp()

Page({

    data: {
        userInfo: {},
        newInfo: "",
        grid: []
    },

    onLoad: function (options) {
        wx.hideHomeButton()
        this.setData({
            userInfo: app.globalData.userInfo
        })
    },

    onShow: function () {
        wx.onSocketMessage((result) => {
            this.onSocketMsg(JSON.parse(result.data))
        })
        app.sendSocketMsg("getHome")
    },

    onSocketMsg: function (data) {
        let msg = data.msg;
        let obj = data.obj;
        if (msg == "nothing") {
            console.log(data)
        } else if (msg == "home") {
            this.setData({
                newInfo: obj.newinfo,
                grid: obj.grid
            })
        }
    }
})