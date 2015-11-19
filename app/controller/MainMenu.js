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
                updateMyCalendarCommand:'updateMyMeetingsCommand',
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

        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'mymeetings'}));
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

    updateMyMeetingsCommand: function (bdate,edate) {
        var me = this;
        var paramsObj = new Object();
        paramsObj.userId = '1';
        paramsObj.beginDate = Ext.JSON.encodeDate(bdate); 
        paramsObj.endDate = Ext.JSON.encodeDate(edate); 
        
        var paramsJson = Ext.JSON.encode(paramsObj);
        /* 从后台进行验证 */
        // var urltmp = 'http://10.2.49.252:8080/mtservice/restService/0.1/meeting/mtList/';
        console.log('paramsJson');
        console.log(paramsJson);
        var urltmp = 'http://10.2.20.69:8080/mtservice/restService/0.1/meeting/mtList/';
        Ext.Ajax.request(
        {         
            url: urltmp,
            method: 'POST',
            disableCaching: false,
            // withCredentials: true,
            // useDefaultXhrHeader: false,
            params: paramsJson,
            success: function (response) 
            {
                var resultResponse = Ext.JSON.decode(response.responseText);

                console.log(resultResponse);
                Ext.getStore("MyMeetingsEvent").removeAll();
                /* set MyMeetingsEventStore  mtFlag:1-正在审核；2-未开始；3-已结束；4-已取消；5-草稿；6-删除；*/  
                for(var i = 0; i< resultResponse.length; i++)
                {
                    var curUser = Ext.create('IBApp.model.MyMeetingsEvent', {
                     
                     'title': resultResponse[i].mtTheme,
                     'start': new Date(resultResponse[i].mtBeginTime),
                     'end': new Date(resultResponse[i].mtEndTime),
                     'event': '8.03 - 8:05',
                     'location':resultResponse[i].rooms[0].roomNum,
                     'mtFlag':resultResponse[i].mtFlag,
                     'mtId':resultResponse[i].mtId,
                    });


                    if(resultResponse[i].mtFlag == 1)
                    {
                        curUser.set('statusEn','checking');
                        curUser.set('status','正在审核');
                    }
                    if(resultResponse[i].mtFlag == 2)
                    {
                        curUser.set('statusEn','waiting');
                        curUser.set('status','未开始');
                    }
                    if(resultResponse[i].mtFlag == 3)
                    {
                        curUser.set('statusEn','closed');
                        curUser.set('status','已结束');
                    }
                    if(resultResponse[i].mtFlag == 4)
                    {
                        curUser.set('statusEn','canceled');
                        curUser.set('status','已取消');
                    }
                    if(resultResponse[i].mtFlag == 5)
                    {
                        curUser.set('statusEn','draft');
                        curUser.set('status','草稿');
                    }
                    if(resultResponse[i].mtFlag == 6)
                    {
                        curUser.set('statusEn','deleted');
                        curUser.set('status','删除');
                    }

                    curUser.set('startstr', Ext.JSON.encodeDate(curUser.get('start')));
                    curUser.set('endstr', Ext.JSON.encodeDate(curUser.get('end')));
                    Ext.getStore("MyMeetingsEvent").add(curUser);                
                };
               
                
                //更新Calendar插件的store
                me.getMyMeetingsView().updateEventStore();
                //更新store后再进入Calendar页面
                me.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'mymeetings'}));
                 
            }, 
            failure: function (response) 
            { 
                Ext.Msg.alert('Post 连接失败');
            }
        }); 
 
    },

});

Ext.JSON.encodeDate = function(d) {
    return Ext.Date.format(d, 'Y-m-d H:i:s');
};