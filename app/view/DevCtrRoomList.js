Ext.define('MeetingRoom', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'roomId', type: 'string' },
            { name: 'roomName', type: 'string' },
            { name: 'roomNum', type: 'string' },
            { name: 'floorName', type: 'string' },
            { name: 'building', type: 'string' },
        ]
    }
});

var store = Ext.create('Ext.data.Store', {
   model: 'MeetingRoom',
   data: [
       // { roomId: 'B0902' },
       // { roomId: 'B0910'  },
       // { roomId: 'B1002' },
       // { roomId: 'B1018'  },
   ]
});

Ext.define("IBApp.view.DevCtrRoomList", {
    extend: "Ext.form.Panel",
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
            itemHeight: 70,
            // style: 'border-top: 1px solid #f0f0f0',
            store: store,
            itemTpl: [
                '<div class="list-item-title">{roomName}</div>',
                '<div class="list-item-narrative">{building}&nbsp;>&nbsp;{floorName}&nbsp;>&nbsp;{roomNum}</div>'
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

    showRoomList: function(roomList) {
        store.removeAll();
        for (var i = 0; i < roomList.length; i++) {
            var room = Ext.create('MeetingRoom', {
                'roomId': roomList[i].roomId,
                'roomName': roomList[i].roomName,
                'roomNum': roomList[i].roomNum,
                'floorName': roomList[i].floorName,
                'building': roomList[i].building,
            });
            store.add(room);
        };
    }
});