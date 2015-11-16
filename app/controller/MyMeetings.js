Ext.define("IBApp.controller.MyMeetings", {
    extend: "Ext.app.Controller",
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            myMeetingsView: 'mymeetingsview',
            meetingRequestView:'meetingrequestview',
            deviceControlView:'devicecontrolview',
            searchView:'searchview',
        },
        control: {
            myMeetingsView: {
                meetingsListCommand:'onMeetingsListCommand',
                searchviewCommand:'onSearchviewCommand',
            },
            meetingRequestView: {
                meetingRequestToMyMeetingsCommand:'onMeetingRequestToMyMeetingsCommand',
                meetingRequestToRoomBookSuccessCommand:'onMeetingRequestToRoomBookSuccessCommand',
                deviceControlViewCommand:'onDeviceControlViewCommand',
            },
            deviceControlView: {
                deviceControlToMeetingRequestCommand:'onDeviceControlToMeetingRequestCommand',
            },
            searchView:{
                SearchToMyMeetingsCommand:'onSearchToMyMeetingsCommand',
                SearchCommand:'onSearchCommand',

            }
            
            
        },
        routes: {
            'meetingrequest': 'showMeetingRequestView',
            'devicecontrol': 'showDeviceControlView',
            'search':'showSearchView',
        }
    },

    showMeetingRequestView: function() {
        Ext.Viewport.animateActiveItem(this.getMeetingRequestView(), 'fade');
    },

    showDeviceControlView: function() {
        Ext.Viewport.animateActiveItem(this.getDeviceControlView(), 'fade');
    },


    showSearchView: function() {
        Ext.Viewport.animateActiveItem(this.getSearchView(), 'fade');
    },

    onMeetingRequestToMyMeetingsCommand: function () {
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'mymeetings'}));
    },

    onDeviceControlToMeetingRequestCommand: function () {
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'meetingrequest'}));
    },

    onMeetingRequestToRoomBookSuccessCommand: function() {
        Ext.Msg.alert('会议内容修改成功！');
    },

    onDeviceControlViewCommand: function() {
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'devicecontrol'}));
    },

    onMeetingsListCommand: function(record) {
        this.getMeetingRequestView().modifyMeetingDetails(record);
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'meetingrequest'}));
    },

    onSearchviewCommand: function() {
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'search'}));
    },

    onSearchToMyMeetingsCommand: function () {
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'mymeetings'}));
    },

    onSearchCommand: function (view, keyword) {
        var me = this;
        var paramsObj = new Object();
        paramsObj.userId = '1';
        paramsObj.beginDate = '2015-11-13 00:00:00';
        paramsObj.endDate = '2015-11-30 00:00:00';

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
                var curUser = Ext.create('IBApp.model.MyMeetingsEvent', {
                 'userId': resultResponse.userId,
                 'mtTypeName': resultResponse.mtTypeName,
                 'mtTheme': resultResponse.mtTheme,
                 'mtContent': resultResponse.mtContent,
                 'mtBeginTime': resultResponse.mtBeginTime,
                 'mtEndTime': resultResponse.mtEndTime,
                 'mtFlag': resultResponse.mtFlag,
                 'roomName': resultResponse.rooms.roomName,
                });
                console.log('roomName:'+ resultResponse.rooms.roomName +'\n');
                console.log('roomName:'+ resultResponse.rooms.roomName +'\n');
                Ext.getStore("MyMeetingsSearch").add(curUser);

            }, 
            failure: function (response) 
            {
                me.sessionId = null;
                //me.signInFailure('登录失败...请重试.');
                console.log("连接失败");
            }
        });  
    },
});