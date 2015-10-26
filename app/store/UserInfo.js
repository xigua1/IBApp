Ext.define("IBApp.store.UserInfo", {
    extend: "Ext.data.Store",
    storeId: 'userInfoStore',
    config: {
        model: "IBApp.model.UserInfo",
        data: [
        ]
    }
});