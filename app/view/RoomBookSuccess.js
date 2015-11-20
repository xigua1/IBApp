Ext.define('IBApp.view.RoomBookSuccess', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Panel',
    ],
    xtype: 'roombooksuccessview',

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '预定会议室',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'backButton',
                        ui: 'back',
                        text: '首页'
                    }
                ]
            },
            {
                xtype: 'panel',
                html: '<p style="text-align:center">恭喜您！会议室预定成功！</p>',
            },
            {
                xtype: 'fieldset',
                title: '会议基本信息',
                defaults: {
                    xtype: 'textfield',
                    readOnly: true
                },
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'mtId',
                        id: 'mtIdText',
                    },
                    {
                        label: '名称',
                        value: '无',
                    },                    
                    {
                        itemId: 'mtTime',
                        label: '时间',
                    },                    
                    {
                        itemId: 'mtLocation',
                        label: '地点',
                    },
                    {
                        itemId: 'mtOrganizer',
                        label: '组织者',
                    },
                    {
                        itemId: 'mtAttenders',
                        label: '与会人员',
                        value: '无',
                    },
                    {
                        itemId: 'mtServices',
                        label: '服务',
                        value: '无',
                    },
                    {
                        label: '会议摘要',
                        value: '无',
                    },
                    // {
                    //     label: '附件',
                    //     value: '无',
                    // },
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'modifyMeetingInfoButton',
                        text: '完善会议信息'
                    },
                    {
                        xtype: 'button',
                        itemId: 'myMeetingsButton',
                        text: '查看我的会议'
                    },
                ]
            },
        ],
        listeners: [
            {
                fn: 'onBackButtonTap',
                event: 'tap',
                delegate: '#backButton'
            },
            {
                fn: 'onModifyMeetingInfoButton',
                event: 'tap',
                delegate: '#modifyMeetingInfoButton'
            },
            {
                fn: 'onMyMeetingsButton',
                event: 'tap',
                delegate: '#myMeetingsButton'
            },
        ]
    },

    onBackButtonTap: function(button, e, eOpts) {
        this.fireEvent("backButtonCommand");
    },
    
    onModifyMeetingInfoButton: function(button, e, eOpts) {
        this.fireEvent("modifyMeetingInfoButtonCommand");
    },

    onMyMeetingsButton: function(button, e, eOpts) {
        this.fireEvent("myMeetingsButtonCommand");
    },

    showMeetingInfo: function(mtInfoObj, roomInfo, mtId) {
        this.down('#mtIdText').setValue(mtId);
        this.down('#mtTime').setValue(mtInfoObj.mtBeginTime + '~' + mtInfoObj.mtEndTime);
        this.down('#mtLocation').setValue(roomInfo);
        this.down('#mtOrganizer').setValue(mtInfoObj.organizerName);
        this.down('#mtAttenders').setValue(mtInfoObj.attenders[0].userName);
        
        if(mtInfoObj.services == null) {
            this.down('#mtServices').setValue('无');
        }
        else {
            var str = '';
            for (var i=0; i < mtInfoObj.services.length; i++) {
                var tmp = mtInfoObj.services[i].serviceName + ':' + mtInfoObj.services[i].serviceNum;
                str += tmp + '个;    ';
            }
            this.down('#mtServices').setValue(str);
        }
    }
});