// pages/users/users.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'

const app = getApp()

Page({

    data: {
        data: [],
        nowDepId: 0
    },

    onLoad: function (options) {

    },

    onShow: function () {
        wx.onSocketMessage((result) => {
            this.onSocketMsg(JSON.parse(result.data))
        })
        app.sendSocketMsg("getUsers")
        this.setData({
            nowDepId: 0
        })
    },
    tapItem: function (e) {
        let depId = e.detail.itemid
        if (this.data.nowDepId == 0) {
            this.setData({
                nowDepId: 1
            })
            Dialog.confirm({
                message: '是否查看改部门下用户?'
            }).then(() => {
                this.setData({
                    nowDepId: 0
                })
                wx.navigateTo({
                    url: '/pages/userlist/userlist?depid=' + depId
                })
            }).catch(() => {
                this.setData({
                    nowDepId: 0
                })
            })
        }
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