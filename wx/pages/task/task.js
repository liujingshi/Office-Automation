// pages/task/task.js
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
        app.sendSocketMsg("getMyTask")
    },
    open: function (e) {
        let filePath = e.currentTarget.dataset.file_path
        app.dowmloadAndOpenDocument(filePath)
    },
    doTask: function (e) {
        let taskId = e.currentTarget.dataset.task_id
        wx.navigateTo({
          url: '/pages/dotask/dotask?task_id=' + taskId
        })
    },
    onSocketMsg: function (data) {
        let msg = data.msg;
        let obj = data.obj;
        if (msg == "mytask") {
            this.setData({
                task: obj
            })
        }
    }
    
})