// pages/addinfo/addinfo.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: "",
        text: ""
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