// pages/upload/upload.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

const app = getApp()

Page({

    data: {
        title: ""
    },

    onLoad: function (options) {

    },

    onShow: function () {
        wx.onSocketMessage((result) => {
            this.onSocketMsg(JSON.parse(result.data))
        })
    },

    setTitle: function (event) {
        this.setData({
            title: event.detail
        })
    },
    upload: function (event) {
        let title = this.data.title
        if (title == "") {
            Toast.fail("请输入文件名")
        } else {
            wx.uploadFile({
                filePath: event.detail.file.path,
                name: 'file',
                url: app.globalData.requestUrl + "upload",
                formData: {
                    title: this.data.title
                },
                success: (result) => {
                    Toast.success("上传成功")
                },
              })
        }
    },
    onSocketMsg: function (data) {
        let msg = data.msg;
        let obj = data.obj;
        if (msg == "uploadSuccess") {
            Toast.success("上传成功")
        }
    }
})