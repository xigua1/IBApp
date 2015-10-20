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
                html: '<p style="text-align:center">恭喜您！会议室B0910已经预定成功！</p>',
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
                        label: '名称',
                        value: 'XX项目例会',
                    },                    
                    {
                        label: '时间',
                        value: '2015.10.19 14:00 ~ 2015.10.19 16:00',
                    },                    
                    {
                        label: '地点',
                        value: '会议室B0910',
                    },
                    {
                        label: '组织者',
                        value: '张三(软件所 信息二室)',
                    },
                    {
                        label: '与会者',
                        value: '无',
                    },
                    {
                        label: '服务',
                        value: '无',
                    },
                    {
                        label: '会议摘要',
                        value: '无',
                    },
                    {
                        label: '附件',
                        value: '无',
                    },
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
        ]
    },

    onBackButtonTap: function(button, e, eOpts) {
        this.fireEvent("backButtonCommand");
    },
    
    onModifyMeetingInfoButton: function(button, e, eOpts) {
        this.fireEvent("modifyMeetingInfoButtonCommand");
    }
});