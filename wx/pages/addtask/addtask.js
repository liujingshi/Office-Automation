// pages/addtask/addtask.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        file: [],
        file_id: 0,
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
        app.sendSocketMsg("getFile")
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