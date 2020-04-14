// pages/home/home.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        newInfo: "",
        grid: [{
                text: "消息",
                icon: "chat-o",
                info: "66",
                url: ""
            },
            {
                text: "通讯录",
                icon: "friends-o",
                info: "",
                url: ""
            },
            {
                text: "公告",
                icon: "volume-o",
                info: "",
                url: "/pages/info/info"
            },
            {
                text: "任务",
                icon: "todo-list-o",
                info: "",
                url: ""
            },
            {
                text: "发布公告",
                icon: "notes-o",
                info: "",
                url: "/pages/addinfo/addinfo"
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.hideHomeButton()
        this.setData({
            userInfo: app.globalData.userInfo
        })
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
        app.sendSocketMsg("getNewInfo")
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
    onSocketMsg: function (data) {
        let msg = data.msg;
        let obj = data.obj;
        if (msg == "nothing") {
            console.log(data)
        } else if (msg == "newInfo") {
            this.setData({
                newInfo: obj
            })
        }
    }
})