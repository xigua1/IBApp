Ext.define("IBApp.store.UserInfo", {
    extend: "Ext.data.Store",
    xtype: 'userInfoStore',
    config: {
        model: "IBApp.model.UserInfo",
        data: [
        ]
    }
});