Ext.define("IBApp.store.UserInfo", {
    extend: "Ext.data.Store",
    xtype: 'userinfostore',
    config: {
        model: "IBApp.model.UserInfo",
        data: [
            { id: "80101234", imgURL: "./resources/icons/profile.png", userName: "张三", userRole: "SuperAdmin" },
        ]
    }
});