Ext.define("IBApp.store.MyMeetingsSearch", {
    extend: "Ext.data.Store",
    xtype: 'mymeetingssearchstore',
    config: {
        model: "IBApp.model.MyMeetingsEvent",
        data: [
        ]
    }
});