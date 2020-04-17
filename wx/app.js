//app.js

App({
    onLaunch: function () {

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                wx.connectSocket({
                    url: this.globalData.socketUrl + "?code=" + res.code
                })
                wx.onSocketOpen((result) => {
                    this.globalData.socketConnectStatus = true
                })
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    sendSocketMsg: function (msg, obj = "") {
        if (this.globalData.socketConnectStatus == true) {
            wx.sendSocketMessage({
                data: JSON.stringify({
                    msg: msg,
                    obj: obj
                })
            })
        }
    },
    dowmloadAndOpenDocument: function (filePath) {
        wx.downloadFile({
            url: this.globalData.requestUrl + "files/" + filePath,
            success: (result) => {
                wx.openDocument({
                    filePath: result.tempFilePath,
                    success: (res) => {
                        
                    }
                })
            },
        })
    },
    globalData: {
        userInfo: null,
        requestUrl: "https://www.wenlijie.com/",
        socketUrl: "wss://www.wenlijie.com/wss",
        socketConnectStatus: false
    },
    objectData: {

    }
})