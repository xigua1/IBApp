Ext.define("IBApp.store.SceneMode", {
    extend: "Ext.data.Store",
    xtype: 'scenemodestore',
    config: {
        model: "IBApp.model.SceneMode",
        data: [
            { id: "1", type: "投影模式" },
            { id: "2", type: "视频会议模式" },
            { id: "3", type: "讨论模式" },
           
            
        ]
    }
});