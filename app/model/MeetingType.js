Ext.define("IBApp.model.MeetingType", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            { name: 'mtTypeId', type: 'string' },
            { name: 'mtTypeName', type: 'string' },
        ]
    }
});