// pages/ctask/ctask.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

const app = getApp()

Page({

    data: {
        task: {},
        task_id: 0,
        text: ""
    },

    onLoad: function (options) {
        this.setData({
            task_id: options.task_id
        })
    },
    onShow: function () {
        wx.onSocketMessage((result) => {
            this.onSocketMsg(JSON.parse(result.data))
        })
        app.sendSocketMsg("getThisCheckTask", {task_id: this.data.task_id})
    },
    open: function (e) {
        let filePath = e.currentTarget.dataset.file_path
        app.dowmloadAndOpenDocument(filePath)
    },
    setText: function (event) {
        this.setData({
            text: event.detail.value
        })
    },
    checkTaskSuccess: function () {
        let data = {
            task_id: this.data.task_id,
            task_status_no: 3,
            task_text: this.data.text
        }
        app.sendSocketMsg("checkTask", data)
    },
    checkTaskFail: function () {
        let data = {
            task_id: this.data.task_id,
            task_status_no: 1,
            task_text: this.data.text
        }
        app.sendSocketMsg("checkTask", data)
    },
    onSocketMsg: function (data) {
        let msg = data.msg;
        let obj = data.obj;
        if (msg == "thisCheckTask") {
            this.setData({
                task: obj,
                text: obj.task_text
            })
        } else if (msg == "checkTaskSuccess") {
            Toast.success("操作成功")
        }
    }
})