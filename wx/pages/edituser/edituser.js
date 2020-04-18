// pages/edituser/edituser.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

const app = getApp()

Page({

    data: {
        user_id: 0,
        name: "",
        dep_id: 0,
        pos_id: 0,
        dep: [],
        pos: []
    },

    onLoad: function (options) {
        this.setData({
            user_id: options.userid
        })
    },

    onShow: function () {
        wx.onSocketMessage((result) => {
            this.onSocketMsg(JSON.parse(result.data))
        })
        app.sendSocketMsg("getDep")
        app.sendSocketMsg("getPos")
        app.sendSocketMsg("getUserinfo", {user_id: this.data.user_id})
    },
    setName: function (e) {
        this.setData({
            name: e.detail
        })
    },
    setDep: function (e) {
        this.setData({
            dep_id: e.detail
        })
    },
    setPos: function (e) {
        this.setData({
            pos_id: e.detail
        })
    },
    onClick: function () {
        let data = {
            user_id: this.data.user_id,
            dep_id: this.data.dep_id,
            pos_id: this.data.pos_id,
            user_name: this.data.name
        }
        app.sendSocketMsg("updateUserDP", data)
    },
    onSocketMsg: function (data) {
        let msg = data.msg;
        let obj = data.obj;
        if (msg == "dep") {
            let datas = []
            for (let i in obj) {
                datas.push({
                    text: obj[i].dep_name,
                    value: obj[i].dep_id
                })
            }
            this.setData({
                dep: datas
            })
        } else if (msg == "pos") {
            let datas = []
            for (let i in obj) {
                datas.push({
                    text: obj[i].pos_name,
                    value: obj[i].pos_id
                })
            }
            this.setData({
                pos: datas
            })
        } else if (msg == "userinfo") {
            this.setData({
                name: obj.user_name,
                dep_id: obj.dep_id,
                pos_id: obj.pos_id
            })
        } else if (msg == "updateUserinfoSuccess") {
            Toast.success("修改成功")
        }
    }
    
})