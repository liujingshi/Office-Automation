// pages/addtask/addtask.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

const app = getApp()

Page({

    data: {
        file: [],
        file_id: 0,
        title: "",
        text: ""
    },

    onLoad: function (options) {

    },

    onShow: function () {
        wx.onSocketMessage((result) => {
            this.onSocketMsg(JSON.parse(result.data))
        })
        app.sendSocketMsg("getFile")
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
    setTitle: function (event) {
        this.setData({
            title: event.detail
        })
    },
    setText: function (event) {
        this.setData({
            text: event.detail.value
        })
    },
    onAdd: function () {
        let data = {
            task_title: this.data.title,
            task_text: this.data.text,
            task_file_id: this.data.file_id
        }
        app.sendSocketMsg("addTask", data)
    },
    onSocketMsg: function (data) {
        let msg = data.msg;
        let obj = data.obj;
        if (msg == "files") {
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
        } else if (msg == "addTaskSuccess") {
            Toast.success("发布成功")
        }
    }
})