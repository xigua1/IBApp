Ext.define("IBApp.model.Attenders", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            { name: 'userId', type: 'string' },
            { name: 'userName', type: 'string' },
            { name: 'flag', type: 'int' },
        ]
    }
});