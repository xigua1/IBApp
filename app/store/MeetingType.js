Ext.define("IBApp.store.MeetingType", {
    extend: "Ext.data.Store",
    xtype: 'meetingtypestore',
    config: {
        model: "IBApp.model.MeetingType",
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
            { id: "1", type: "会务接待" },
            { id: "2", type: "公司级会议" },
            { id: "3", type: "涉密会议" },
            { id: "4", type: "部门特殊会议" },
            { id: "5", type: "技术讨论" },
            { id: "6", type: "长期占用" },
            { id: "7", type: "培训" },
        ]
    }
});