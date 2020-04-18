// pages/home/home.js
const app = getApp()

Page({

    data: {
        userInfo: {},
        newInfo: "",
        grid: [],
        userInfoServer: {}
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
        app.sendSocketMsg("getMyInfo")
    },

    editUserinfo: function () {
        wx.navigateTo({
            url: '/pages/edituser/edituser?userid=' + this.data.userInfoServer.user_id,
        })
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
        } else if (msg == "myUserinfo") {
            this.setData({
                userInfoServer: obj
            })
            app.globalData.userInfoServer = obj
        } else if (msg == "reMessage") {
            app.sendSocketMsg("getHome")
        }
    }
})