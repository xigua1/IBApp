Ext.define("IBApp.store.UrlAddr", {
    extend: "Ext.data.Store",
    xtype: 'urladdrstore',

    config: {
        model: "IBApp.model.UrlAddr",
     data: [
        {
            urlLogin: 'http://10.2.49.251:8080/pactera-jeesite/restService/userservice/0.2',
            urlServer: 'http://10.2.49.250:8080/mtservice/restService/0.1',
        }, 

        ]
    }
});