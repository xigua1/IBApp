var day = (new Date()).getDate(),
    month = (new Date()).getMonth(),
    year = (new Date()).getFullYear();


Ext.define("IBApp.store.MyMeetingsEvent", {
    extend: "Ext.data.Store",
    xtype: 'mymeetingseventstore',

    config: {
        model: "IBApp.model.MyMeetingsEvent",
     data: [{
            event: '8.03 - 8:05',
            title: '党组织活动通知1',
            start: new Date(year, month, day, 8, 3),
            end: new Date(year, month, day, 8, 5),
            location: 'B0910',
            status: '已结束',
            statusEn: 'closed'
        }, {
            event: '7:00 - 7:05',
            title: '党组织活动通知2',
            start: new Date(year, month, day, 7, 0),
            end: new Date(year, month, day, 7, 5),
            location: 'B0910',
            status: '进行中',
            statusEn: 'holding'
        }, {
            event: '7:00 - 7:10',
            title: '党组织活动通知3',
            start: new Date(year, month, day, 7, 0),
            end: new Date(year, month, day, 7, 10),
            location: 'B0910',
            status: '已更新',
            statusEn: 'modified'
        }, {
            event: '7:06 - 7:15',
            title: '党组织活动通知4',
            start: new Date(year, month, day, 7, 6),
            end: new Date(year, month, day, 7, 15),
            location: 'B0910',
            status: '待开始',
            statusEn: 'opening'
        }, {
            event: '19.00 - 20:30',
            title: '党组织活动通知 5',
            start: new Date(year, month, day-2, 19, 0),
            end: new Date(year, month, day-2, 20, 30),
            location: 'B0910',
            status: '待开始',
            statusEn: 'opening'
        }, {
            event: '13:15 - 14:05',
            title: '党组织活动通知6',
            start: new Date(year, month, day-11, 13, 15),
            end: new Date(year, month, day-11, 14, 5),
            location: 'B0910',
            status: '待开始',
            statusEn: 'opening'
        }, {
            event: '15:00 - 16:10',
            title: '党组织活动通知 7',
            start: new Date(year, month, day+2, 15, 0),
            end: new Date(year, month, day+2, 16, 10),
            location: 'B0910',
            status: '待开始',
            statusEn: 'opening'
        }, {
            event: '00:00 - 00:00',
            title: '党组织活动通知 8',
            start: new Date(year, month, day+6, 0, 0),
            end: new Date(year, month, day+7, 0, 0),
            location: 'B0910',
            status: '待开始',
            statusEn: 'opening'
        }]
    }
});