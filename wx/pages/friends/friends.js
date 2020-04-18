// pages/friends/friends.js
const app = getApp()

Page({

    data: {
        friends: []
    },

    onLoad: function (options) {
        
    },

    onShow: function () {
        wx.onSocketMessage((result) => {
            this.onSocketMsg(JSON.parse(result.data))
        })
        app.sendSocketMsg("getFriends")
    },

    onSocketMsg: function (data) {
        let msg = data.msg;
        let obj = data.obj;
        if (msg == "friends") {
            this.setData({
                friends: obj
            })
        }
    }
    
})