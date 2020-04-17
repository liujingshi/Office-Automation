// pages/userlist/userlist.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

const app = getApp()

Page({

    data: {
        dep_id: 0,
        users: []
    },

    onLoad: function (options) {
        // console.log(options)
        this.setData({
            dep_id: options.depid
        })
    },

    onShow: function () {
        wx.onSocketMessage((result) => {
            this.onSocketMsg(JSON.parse(result.data))
        })
        // console.log(this.data)
        app.sendSocketMsg("getUserlist", {dep_id: this.data.dep_id})
    },
    onSocketMsg: function (data) {
        let msg = data.msg;
        let obj = data.obj;
        if (msg == "userlist") {
            this.setData({
                users: obj
            })
        }
    }

})