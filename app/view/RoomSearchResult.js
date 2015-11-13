var obj;

Ext.define('IBApp.view.RoomSearchResult', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Panel',
        'Ext.dataview.List',
        'Ext.XTemplate',
        'Ext.field.Radio'
    ],
    xtype: 'roomsearchresultview',
    id: 'form',

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
                itemId: 'roomListFieldset',
                title: '我们已成功为您找到以下会议室，快点抢占吧~',
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

        this.fireEvent("backButtonCommand");
    },

    onRoomBookButtonTap: function() {
        this.fireEvent("roomBookButtonCommand", this, obj, this.getValues().roomIds);
    },

    showRoomList: function(meetingObj, recommendRoomsArray) {
        obj = meetingObj;

        var roomListFieldset = this.down('#roomListFieldset');
        var arrLen = recommendRoomsArray.length;

        roomListFieldset.setTitle('成功为您找到<span style="color:blue;font-size:1.5em">'+arrLen+'</span>个会议室，快点抢占吧~');
        roomListFieldset.removeAll();

        for (var i=0; i < arrLen; i++) {
            var room = Ext.create('Ext.field.Radio', {
                name: 'roomIds',
                labelWrap: true,
                labelWidth: '80%',
                label: [
                    '<div class="list-item-title">'+recommendRoomsArray[i].roomName+'</div>',
                    '<div class="list-item-narrative">'+recommendRoomsArray[i].building+'&nbsp;>&nbsp;'+recommendRoomsArray[i].floorName+'&nbsp;>&nbsp;'+recommendRoomsArray[i].roomNum+'&nbsp;&nbsp;&nbsp;&nbsp;容量:'+recommendRoomsArray[i].roomMaxSize+'</div>',
                ].join(''),
                value: recommendRoomsArray[i].roomId
            });
            if(i==0) {
                room.check();
            }

            roomListFieldset.add(room);
        }
    },

    showMessages: function(message) {
        Ext.Msg.alert(message);
    }

});