// pages/users/users.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'

const app = getApp()

Page({

    data: {
        data: []
    },

    onLoad: function (options) {

    },

    onShow: function () {
        wx.onSocketMessage((result) => {
            this.onSocketMsg(JSON.parse(result.data))
        })
        app.sendSocketMsg("getUsers")
    },
    tapItem: function (e) {
        Dialog.confirm({
            message: '是否查看改部门下用户?'
        }).then(() => {
            let depId = e.detail.itemid
            wx.navigateTo({
                url: '/pages/userlist/userlist?depid=' + depId
            })
        }).catch(() => {
            // on cancel
        })
    },
    onSocketMsg: function (data) {
        let msg = data.msg;
        let obj = data.obj;
        if (msg == "users") {
            this.setData({
                data: obj
            })
        }
    }

})