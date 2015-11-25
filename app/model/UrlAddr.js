Ext.define("IBApp.model.UrlAddr", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            { name: 'urlLogin', type: 'string' },
            { name: 'urlServer', type: 'string' },
        ]
    }
});