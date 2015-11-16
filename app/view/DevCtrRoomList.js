Ext.define('MeetingRoom', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['roomId']
    }
});

var store = Ext.create('Ext.data.Store', {
   model: 'MeetingRoom',
   data: [
       { roomId: 'B0902' },
       { roomId: 'B0910'  },
       { roomId: 'B1002' },
       { roomId: 'B1018'  },
   ]
});

Ext.define("IBApp.view.DevCtrRoomList", {
    extend: "Ext.Panel",
    requires: ['Ext.data.Store'],
    xtype: 'devctrroomlistview',
    config:{
        // scrollable:'vertical',
        layout: {
            type: 'vbox',   
        },
    },
    initialize: function () {

        this.callParent(arguments);

        var backButton = {
        	xtype: 'button',
        	ui: 'back',
        	text: '首页',
        	handler: this.onBackButtonTap,
        	scope: this
        };

        var topToolbar = {
        	xtype: 'toolbar',
        	docked: 'top',
        	title: '设备控制',
        	items: [backButton]
        };

        var roomList = Ext.create('Ext.dataview.List', {
            flex: 1,
            onItemDisclosure: true,
            height: 250,
            itemHeight: 70,
            // style: 'border-top: 1px solid #f0f0f0',
            store: store,
            // itemTpl: '{roomId}',
            itemTpl: [
                '<div class="list-item-title">{roomId}</div>',
                // '<div class="list-item-narrative">{event}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{location}</div>'
                '<div class="list-item-narrative">XXX项目例会&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;视频会议室</div>'
            ].join(""),
            emptyText: '<div class="notes-list-empty-text">没有可控制的会议室</div>',
            listeners: {
                itemtap: { fn: this.onRoomListTap, scope: this },
            }
        });

        this.add([
            topToolbar,
            roomList,
        ]);
    },

    onBackButtonTap: function() {
    	this.fireEvent("backToMainMenuCommand");
    },

    onRoomListTap: function(list, index, target, record, e, eOpts) {
        this.fireEvent('roomListTapCommand', record);
    },

});