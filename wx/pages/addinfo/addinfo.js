// pages/addinfo/addinfo.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

const app = getApp()

Page({

    data: {
        title: "",
        text: ""
    },

    onLoad: function (options) {

    },

    onShow: function () {
        wx.onSocketMessage((result) => {
            this.onSocketMsg(JSON.parse(result.data))
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

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
    onAdd: function (e) {
        app.sendSocketMsg("addInfo", {
            info_title: this.data.title,
            info_text: this.data.text
        })
    },
    onSocketMsg: function (data) {
        let msg = data.msg;
        let obj = data.obj;
        if (msg == "addInfoSuccess") {
            Toast.success('发布成功')
            // wx.navigateBack()
        }
    }
})