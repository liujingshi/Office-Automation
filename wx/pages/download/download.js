// pages/download/download.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

const app = getApp()

Page({

    data: {
        file: []
    },

    onLoad: function (options) {

    },

    onShow: function () {
        wx.onSocketMessage((result) => {
            this.onSocketMsg(JSON.parse(result.data))
        })
        app.sendSocketMsg("getFile")
    },

    dowmload: function (e) {
        let filePath = e.currentTarget.dataset.file_path
        app.dowmloadAndOpenDocument(filePath)
    },
    onSocketMsg: function (data) {
        let msg = data.msg;
        let obj = data.obj;
        if (msg == "files") {
            this.setData({
                file: obj
            })
        }
    }
})