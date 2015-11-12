var str='aaaa';
Ext.define('IBApp.view.RoomSearchResult', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Panel',
        'Ext.dataview.List',
        'Ext.XTemplate',
        'Ext.field.Radio'
    ],
    xtype: 'roomsearchresultview',

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
                        text: '后退'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '我们已成功为您找到以下会议室，快点抢占吧~',
                
                defaults: {
                    xtype: 'radiofield',
                    name: 'emptyRoom',
                    labelWrap: true,
                    labelWidth: '80%'
                },
                items: [
                    {
                        label: ['<h1>B0910 小型讨论室'+str+'</h1>', '<p style="color:gray">B0910 小型讨论室</p>'].join(''),
                        value: 'B0910'
                    },
                    {
                        label: 'B0912 普通会议室',
                        value: 'B0912'
                    },                    
                    {
                        label: 'B0918 培训室',
                        value: 'B0918'
                    },                    
                    {
                        label: 'B0926 视频会议室',
                        value: 'B0926'
                    },
                ]
            },
            {
                xtype: 'button',
                itemId: 'roomBookButton',
                ui: 'action',
                text: '预定',
            }
        ],
        listeners: [
            {
                fn: 'onBackButtonTap',
                event: 'tap',
                delegate: '#backButton'
            },
            {
                fn: 'onRoomBookButtonTap',
                event: 'tap',
                delegate: '#roomBookButton'
            }
        ]
    },

    onBackButtonTap: function(button, e, eOpts) {
        // var radioBtn = Ext.create('Ext.field.Radio', {
        //     name: 'emptyRoom',
        //     label: 'B0926'
        // });
        // this.add([radioBtn]);
        this.fireEvent("backButtonCommand");
    },

    onRoomBookButtonTap: function() {
        this.fireEvent("roomBookButtonCommand");
    }

});