var proxy = Ext.create('Ext.data.proxy.Ajax', {
    url: 'http://10.2.49.250:8080/mtservice/restService/0.1/mtType/mtTypeListByUser/',
    // url: 'http://10.2.20.69:8080/mtservice/restService/0.1/mtType/mtTypeListByUser/',
    enablePagingParams: false,
    /* 目前采用的GET url 地址拼接的方式 */
    // extraParams: {
    //     userId: '',
    // },
    reader: {
        type: 'json',
        // rootProperty: 'meetingType'
    }
});

Ext.define("IBApp.store.MeetingType", {
    extend: "Ext.data.Store",
    xtype: 'meetingtypestore',
    config: {
        model: "IBApp.model.MeetingType",
        proxy: proxy,
        data: [
        ]
    }
});