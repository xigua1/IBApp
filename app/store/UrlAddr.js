Ext.define("IBApp.store.UrlAddr", {
    extend: "Ext.data.Store",
    xtype: 'urladdrstore',

    config: {
        fields: [
            { name: 'urlLogin', type: 'string' },
            { name: 'urlServer', type: 'string' },
        ],
        data: [
        {
            urlLogin: 'http://meetingadmin.crscd.com.cn:8080/pactera-jeesite/restService/userservice/0.2',
            urlServer: 'http://meeting.crscd.com.cn:8080/mtservice/restService/0.1',
        }, 

        ]
    }
});