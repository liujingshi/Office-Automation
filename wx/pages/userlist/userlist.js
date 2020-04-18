// pages/userlist/userlist.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

const app = getApp()

Page({

    data: {
        dep_id: 0,
        users: [],
        power: 0
    },

    onLoad: function (options) {
        // console.log(options)
        this.setData({
            dep_id: options.depid,
            power: app.globalData.userInfoServer.power_level
        })
    },

    onShow: function () {
        wx.onSocketMessage((result) => {
            this.onSocketMsg(JSON.parse(result.data))
        })
        // console.log(this.data)
        app.sendSocketMsg("getUserlist", {
            dep_id: this.data.dep_id
        })
    },
    addFriend: function (event) {
        let userid = event.currentTarget.dataset.userid
        app.sendSocketMsg("addFriend", {
            friendid: userid
        })
    },
    editUserinfo: function (event) {
        let userid = event.currentTarget.dataset.userid
        if (true) {
            wx.navigateTo({
                url: '/pages/edituser/edituser?userid=' + userid
            })
        }
    },
    onSocketMsg: function (data) {
        let msg = data.msg;
        let obj = data.obj;
        if (msg == "userlist") {
            this.setData({
                users: obj
            })
        } else if (msg == "addFriendSuccess") {
            Toast.success("添加成功")
        }
    }

})