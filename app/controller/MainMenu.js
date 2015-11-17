Ext.define("IBApp.controller.MainMenu", {
    extend: "Ext.app.Controller",
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            mainMenuView: 'mainmenuview',
            roomBookingView: 'roombookingview',
            myMeetingsView:'mymeetingsview',
            devCtrRoomListView: 'devctrroomlistview',
        },
        control: {
        	mainMenuView: {
        		roomBookingCommand: 'onRoomBookingCommand',
        		MyMeetingsCommand:'onMyMeetingsCommand',
                deviceControlCommand: 'onDeviceControlCommand',
        	},
        	roomBookingView: {
        		backToMainMenuCommand: 'onBacktoMainMenuCommand',
        	},
            myMeetingsView: {
                MyMeetingsToMainMenuCommand: 'onBacktoMainMenuCommand',
            },
            devCtrRoomListView: {
                backToMainMenuCommand: 'onBacktoMainMenuCommand',
            },
        },
        routes: {
            'mainmenu': 'showMainMenuView',
            'roombooking': 'showRoomBookingView',
            'mymeetings': 'showMyMeetingsView',
            'devctrroomlist': 'showDevCtrRoomListView'
        }
    },

    showMainMenuView: function() {
        Ext.Viewport.animateActiveItem(this.getMainMenuView(), 'fade');
    },

    showRoomBookingView: function() {
        Ext.Viewport.animateActiveItem(this.getRoomBookingView(), 'fade');
    },

    showMyMeetingsView: function() {
        Ext.Viewport.animateActiveItem(this.getMyMeetingsView(), 'fade');
    },

    showDevCtrRoomListView: function() {
        Ext.Viewport.animateActiveItem(this.getDevCtrRoomListView(), 'fade');
    },

    onRoomBookingCommand: function () {
        var userId = Ext.getStore("UserInfo").getAt(0).get('userId');
       
        this.getRoomBookingView().updateMeetingTypeSelector(userId);
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'roombooking'}));
    },

    onDeviceControlCommand: function () {
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'devctrroomlist'}));
    },
    
    onMyMeetingsCommand: function () {
        var day = (new Date()).getDate(),
        month = (new Date()).getMonth(),
        year = (new Date()).getFullYear();

       
        var bdate = new Date(year, month, 1,0,0);
        var edate = new Date(year, month, Ext.Date.getDaysInMonth(bdate),24,0);
        console.log('Ext.Date.getDaysInMonth(bdate)');
        console.log(Ext.Date.getDaysInMonth(bdate));
        this.updateMyMeetingsCommand(bdate,edate);
    },

    onBacktoMainMenuCommand: function() {
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'mainmenu'}));
    },

    updateMyMeetingsCommand: function (bDate,eDate) {
        var me = this;
        var paramsObj = new Object();
        paramsObj.userId = '1';
        paramsObj.beginDate = Ext.JSON.encode(bDate); 
        paramsObj.endDate = Ext.JSON.encode(eDate); 
 

        var paramsJson = Ext.JSON.encode(paramsObj);
        console.log(paramsJson);
        /* 从后台进行验证 */
        Ext.Ajax.request(
        {
            // url:'http://192.168.20.109:8005/BackEndTest/PlaceType.php',
            url: 'http://10.2.49.252:8080/mtservice/restService/0.1/meeting/mtList',
            method: 'POST',
            disableCaching: false,
            withCredentials: true,
            useDefaultXhrHeader: false,
            params: paramsJson,
            success: function (response) 
            {
                var resultResponse = Ext.JSON.decode(response.responseText);

                console.log(resultResponse);
                /* set MyMeetingsEventStore */  
                for(var i = 0; i< resultResponse.length; i++)
                {
                    var curUser = Ext.create('IBApp.model.MyMeetingsEvent', {
                     
                     'title': resultResponse[i].mtTheme,
                     'start': new Date(resultResponse[i].mtBeginTime),
                     'end': new Date(resultResponse[i].mtEndTime),
                     'event': '8.03 - 8:05',
                     'location':resultResponse[i].rooms[0].roomName
                    });
                    console.log('location:'+ curUser.get('location')  +'\n');
                    Ext.getStore("MyMeetingsEvent").removeAll();
                    Ext.getStore("MyMeetingsEvent").add(curUser);
                    
                };
                //更新Calendar插件的store
                me.getMyMeetingsView().updateEventStore();
                //更新store后再进入Calendar页面
                me.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'mymeetings'}));
            }, 
            failure: function (response) 
            {
                me.sessionId = null;
                console.log("连接失败");
            }
        }); 
 
    },

});