// pages/components/mytree/mytree.js
Component({

    properties: {
        model: Object,
    },

    data: {
        activeNames: []
    },

    methods: {
        tapitem: function (e) {
            let itemid = e.currentTarget.dataset.itemid
            this.triggerEvent('tapitem', { itemid: itemid }, { bubbles: true, composed: true })
        },
        onChange(event) {
            this.setData({
                activeNames: event.detail
            });
        }
    }

})