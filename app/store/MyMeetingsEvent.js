// var day = (new Date()).getDate(),
//     month = (new Date()).getMonth(),
//     year = (new Date()).getFullYear();


Ext.define("IBApp.store.MyMeetingsEvent", {
    extend: "Ext.data.Store",
    xtype: 'mymeetingseventstore',

    config: {
        model: "IBApp.model.MyMeetingsEvent",
        autoLoad : true,
        data: [
        ],
        // sorters: [
        //     { property: 'mtBeginTime', direction: 'ASC'},
        // ],
        proxy: {
            type: 'ajax',
            url : 'http://192.168.20.109:8005/BackEndTest/PlaceType.php',
            reader: {
                type: 'json',
            }
        }
    }
});