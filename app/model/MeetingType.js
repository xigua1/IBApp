Ext.define("IBApp.model.MeetingType", {
    extend: "Ext.data.Model",
    config: {
        idProperty: 'id',
        fields: [
            { name: 'id', type: 'string' },
            { name: 'type', type: 'string' },
        ]
    }
});