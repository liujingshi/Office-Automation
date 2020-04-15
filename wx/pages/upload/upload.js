// pages/upload/upload.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
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

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

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
                    let d = JSON.parse(result.data)
                    if (d.code == 1) {
                        Toast.success("上传传功")
                    }
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