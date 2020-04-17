// pages/addpos/addpos.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

const app = getApp()

Page({

    data: {
        pos: [],
        name: ""
    },

    onLoad: function (options) {

    },

    onShow: function () {
        wx.onSocketMessage((result) => {
            this.onSocketMsg(JSON.parse(result.data))
        })
        app.sendSocketMsg("getPos")
    },
    setName: function (event) {
        this.setData({
            name: event.detail
        })
    },
    onAdd: function () {
        let data = {
            pos_name: this.data.name
        }
        app.sendSocketMsg("addPos", data)
    },
    onSocketMsg: function (data) {
        let msg = data.msg;
        let obj = data.obj;
        if (msg == "pos") {
            this.setData({
                pos: obj
            })
        } else if (msg == "addPosSuccess") {
            Toast.success("新增成功")
            app.sendSocketMsg("getPos")
        }
    }
    
})