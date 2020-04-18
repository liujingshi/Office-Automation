// pages/dotask/dotask.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

const app = getApp()

Page({

    data: {
        task: {},
        file: [],
        file_id: 0,
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
        app.sendSocketMsg("getThisTask", {task_id: this.data.task_id})
        app.sendSocketMsg("getFile")
    },
    open: function (e) {
        let filePath = e.currentTarget.dataset.file_path
        app.dowmloadAndOpenDocument(filePath)
    },
    upload: function () {
        wx.navigateTo({
            url: '/pages/upload/upload'
        })
    },
    setFileId: function (event) {
        this.setData({
            file_id: event.detail
        })
    },
    setText: function (event) {
        this.setData({
            text: event.detail.value
        })
    },
    doTask: function () {
        let data = {
            task_id: this.data.task_id,
            task_ok_text: this.data.text,
            task_ok_file_id: this.data.file_id
        }
        app.sendSocketMsg("doTask", data)
    },
    onSocketMsg: function (data) {
        let msg = data.msg;
        let obj = data.obj;
        if (msg == "thisTask") {
            this.setData({
                task: obj,
                text: obj.task_ok_text,
                file_id: obj.task_ok_file_id
            })
        } else if (msg == "doTaskSuccess") {
            Toast.success("提交成功")
        } else if (msg == "files") {
            let files = []
            for (let i in obj) {
                files.push({
                    text: obj[i].file_name,
                    value: obj[i].file_id
                })
            }
            this.setData({
                file: files
            })
        }
    }
})