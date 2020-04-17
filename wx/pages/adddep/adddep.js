// pages/adddep/adddep.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

const app = getApp()

Page({

    data: {
        dep: [],
        name: "",
        upId: 1
    },

    onLoad: function (options) {

    },

    onShow: function () {
        wx.onSocketMessage((result) => {
            this.onSocketMsg(JSON.parse(result.data))
        })
        app.sendSocketMsg("getDep")
    },
    setName: function (event) {
        this.setData({
            name: event.detail
        })
    },
    setUpId: function (event) {
        this.setData({
            upId: event.detail
        })
    },
    onAdd: function () {
        let data = {
            dep_name: this.data.name,
            up_dep_id: this.data.upId
        }
        app.sendSocketMsg("addDep", data)
    },
    onSocketMsg: function (data) {
        let msg = data.msg;
        let obj = data.obj;
        if (msg == "dep") {
            let dep = []
            for (let i in obj) {
                dep.push({
                    text: obj[i].dep_name,
                    value: obj[i].dep_id
                })
            }
            this.setData({
                dep: dep
            })
        } else if (msg == "addDepSuccess") {
            Toast.success("新增成功")
            app.sendSocketMsg("getDep")
        }
    }
})