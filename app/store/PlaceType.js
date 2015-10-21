Ext.define("IBApp.store.PlaceType", {
    extend: "Ext.data.Store",
    xtype: 'placetypestore',
    config: {
        model: "IBApp.model.PlaceType",
        // autoLoad: true,
        // autoDestroy: true,
        // proxy: {
        //     type: 'ajax',
        //     url: 'xxx.php',
        //     reader: {
        //         type: 'json'
        //     }            
        // },
        data: [
            { id: "1", type: "B0910 小型会议室" },
            { id: "2", type: "B0912 普通会议室" },
            { id: "3", type: "B0918 培训室" },
            { id: "4", type: "B0926 视频会议室" },
            
        ]
    }
});