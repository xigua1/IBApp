Ext.define("IBApp.model.PlaceType", {
    extend: "Ext.data.Model",
    config: {
        idProperty: 'id',
        fields: [
            { name: 'id', type: 'string' },
            { name: 'type', type: 'string' },
        ]
    }
});