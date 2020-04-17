// pages/taskstore/taskstore.js
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
        app.sendSocketMsg("getTask")
    },
    onClick: function (e) {
        let taskId = e.currentTarget.dataset.task_id
        app.sendSocketMsg("buyTask", {task_id: taskId})
    },
    onSocketMsg: function (data) {
        let msg = data.msg;
        let obj = data.obj;
        if (msg == "task") {
            this.setData({
                task: obj
            })
        } else if (msg == "buyTaskSuccess") {
            Toast.success("领取成功")
            app.sendSocketMsg("getTask")
        }
    }
    
})