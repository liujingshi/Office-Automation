// pages/checktask/cheaktask.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

const app = getApp()

Page({

    data: {
        task: []
    },

    onLoad: function (options) {

    },

    onShow: function () {
        wx.onSocketMessage((result) => {
            this.onSocketMsg(JSON.parse(result.data))
        })
        app.sendSocketMsg("getCheckTask")
    },
    checkTask: function (e) {
        let taskId = e.currentTarget.dataset.task_id
        wx.navigateTo({
          url: '/pages/ctask/ctask?task_id=' + taskId
        })
    },
    onSocketMsg: function (data) {
        let msg = data.msg;
        let obj = data.obj;
        if (msg == "checkTask") {
            this.setData({
                task: obj
            })
        }
    }
})