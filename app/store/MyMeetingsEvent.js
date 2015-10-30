var day = (new Date()).getDate(),
    month = (new Date()).getMonth(),
    year = (new Date()).getFullYear();


Ext.define("IBApp.store.MyMeetingsEvent", {
    extend: "Ext.data.Store",
    xtype: 'mymeetingseventstore',

    config: {
        model: "IBApp.model.MyMeetingsEvent",
     data: [{
            meetingId: 'MT-0004',
            event: '8.03 - 8:05',
            title: '党组织活动通知1',
            start: new Date(year, month, day, 8, 3),
            end: new Date(year, month, day, 8, 5),
            location: 'B0910',
            organizer: 'XX',
            participants: 'XX;XX;XX;',
            services: '无',
            status: '待开始',
            statusEn: 'opening',
            abstract: '关于开展创建学习型、创新型、服务型党组织活动的通知,活动的主要内容是参观铁道博物馆，电影博物馆和798艺术区'
        }, {
            meetingId: 'MT-0001',
            event: '7:00 - 7:05',
            title: '党组织活动通知2',
            start: new Date(year, month, day, 7, 0),
            end: new Date(year, month, day, 7, 5),
            location: 'B0918',
            organizer: 'YY',
            participants: 'YY;YYY;YY;',
            services: '茶水; 白板; 签字笔',
            status: '已结束',
            statusEn: 'closed',
            abstract: '无'
        }, {
            meetingId: 'MT-0002',
            event: '7:00 - 7:10',
            title: '党组织活动通知3',
            start: new Date(year, month, day, 7, 0),
            end: new Date(year, month, day, 7, 10),
            location: 'B0910',
            organizer: 'ZZ',
            participants: 'ZZ;ZZ;ZZ;',
            services: '无',
            status: '进行中',
            statusEn: 'holding',
            abstract: '关于开展创建学习型、创新型、服务型党组织活动的通知'
        }, {
            meetingId: 'MT-0003',
            event: '7:06 - 7:15',
            title: '党组织活动通知4',
            start: new Date(year, month, day, 7, 6),
            end: new Date(year, month, day, 7, 15),
            location: 'B0910',
            organizer: 'ZZ',
            participants: 'ZZ;ZZ;ZZ;',
            services: '无',
            status: '已更新',
            statusEn: 'modified',
            abstract: '无'
        }, {
            meetingId: 'MT-0005',
            event: '19.00 - 20:30',
            title: '党组织活动通知 5',
            start: new Date(year, month, day-2, 19, 0),
            end: new Date(year, month, day-2, 20, 30),
            location: 'B0910',
            organizer: 'XX',
            participants: 'XX;XX;XX;',
            services: '无',
            status: '已结束',
            statusEn: 'closed',
            abstract: '无'
        }, {
            meetingId: 'MT-0006',
            event: '13:15 - 14:05',
            title: '党组织活动通知6',
            start: new Date(year, month, day-11, 13, 15),
            end: new Date(year, month, day-11, 14, 5),
            location: 'B0910',
            organizer: 'XX',
            participants: 'XX;XX;XX;',
            services: '无',
            status: '已结束',
            statusEn: 'closed',
            abstract: '无'
        }, {
            meetingId: 'MT-0007',
            event: '15:00 - 16:10',
            title: '党组织活动通知 7',
            start: new Date(year, month, day+2, 15, 0),
            end: new Date(year, month, day+2, 16, 10),
            location: 'B0910',
            organizer: 'XX',
            participants: 'XX;XX;XX;',
            services: '无',
            status: '待开始',
            statusEn: 'opening',
            abstract: '无'
        }, {
            meetingId: 'MT-0008',
            event: '00:00 - 00:00',
            title: '党组织活动通知 8',
            start: new Date(year, month, day+6, 0, 0),
            end: new Date(year, month, day+7, 0, 0),
            location: 'B0910',
            organizer: 'XX',
            participants: 'XX;XX;XX;',
            services: '无',
            status: '待开始',
            statusEn: 'opening',
            abstract: '无'
        }],
        sorters: [
            { property: 'start', direction: 'ASC'},
            { property: 'end', direction: 'ASC'},
        ]
    }
});