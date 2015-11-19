Ext.define("IBApp.controller.MyMeetings", {
    extend: "Ext.app.Controller",
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            myMeetingsView: 'mymeetingsview',
            meetingRequestView:'meetingrequestview',
            deviceControlView:'devicecontrolview',
            searchView:'searchview',
            devCtrRoomListView: 'devctrroomlistview',
            chooseAttendersView: 'chooseattendersview',
        },
        control: {
            myMeetingsView: {
                meetingsListCommand:'onMeetingsListCommand',
                searchviewCommand:'onSearchviewCommand',
            },
            meetingRequestView: {
                meetingRequestToMyMeetingsCommand:'onMeetingRequestToMyMeetingsCommand',
                meetingRequestToRoomBookSuccessCommand:'onMeetingRequestToRoomBookSuccessCommand',
                participatorModifyCommand: 'onParticipatorModifyCommand'
            },
            devCtrRoomListView: {
                roomListTapCommand: 'onRoomListTapCommand',
            },
            deviceControlView: {
                backButtonCommand:'onDeviceControlBackButtonCommand',
            },
            searchView:{
                SearchToMyMeetingsCommand:'onSearchToMyMeetingsCommand',
                SearchCommand:'onSearchCommand',
            },
            chooseAttendersView: {
                backToMeetingRequest: 'onBackToMeetingRequest',
            }
        },
        routes: {
            'meetingrequest': 'showMeetingRequestView',
            'devicecontrol': 'showDeviceControlView',
            'search':'showSearchView',
            'chooseattenders': 'showChooseAttendersView',
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

    showChooseAttendersView: function() {
        Ext.Viewport.animateActiveItem(this.getChooseAttendersView(), 'fade');
    },

    onMeetingRequestToMyMeetingsCommand: function () {
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'mymeetings'}));
    },

    /* 修改与会人员页返回至会议详情页 */
    onBackToMeetingRequest: function (mtAttenders, store) {
        if ( (mtAttenders != null) && (store != null) ) {
            this.getMeetingRequestView().setParticipator(mtAttenders, store);
        };
        window.history.go(-1);
    },

    onParticipatorModifyCommand: function (store) {
        var me = this;
        var userId = Ext.getStore("UserInfo").getAt(0).get('userId');
        var inContacts = null, outContacts = null;

        /* 获取内部常用联系人 */
        var urlGetInContacts = 'http://10.2.49.252:8080/mtservice/restService/0.1/topContact/inContactsList/' + userId + '/6';
        Ext.Ajax.request({
            url: urlGetInContacts,
            method: 'GET',
            disableCaching: false,
            success: function (response) {
                inContacts = Ext.JSON.decode(response.responseText);
                me.getChooseAttendersView().showContacts(inContacts, 1);
            },
            failure: function (response) {
                Ext.Msg.alert('获取内部常用联系人失败');
            }
        });
        /* 获取外部常用联系人 */
        var urlGetOutContacts = 'http://10.2.49.252:8080/mtservice/restService/0.1/topContact/outContactsList/' + userId + '/6';
        Ext.Ajax.request({
            url: urlGetOutContacts,
            method: 'GET',
            disableCaching: false,
            success: function (response) {
                outContacts = Ext.JSON.decode(response.responseText);
                me.getChooseAttendersView().showContacts(outContacts, 2);
            },
            failure: function (response) {
                Ext.Msg.alert('获取外部常用联系人失败');
            }
        });
        
        var task = Ext.create('Ext.util.DelayedTask', function () {
            me.getChooseAttendersView().showExistAttenders(store);
        });
        task.delay(500);
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'chooseattenders'}));
    },

    onDeviceControlBackButtonCommand: function () {
        window.history.go(-1);
    },

    onMeetingRequestToRoomBookSuccessCommand: function() {
        Ext.Msg.alert('会议内容修改成功！');
    },

    onRoomListTapCommand: function() {
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

                console.log(resultResponse[0].mtTheme);
                /* set MyMeetingsEventStore */  
                for(var i = 0; i< resultResponse.length; i++)
                {
                    var curUser = Ext.create('IBApp.model.MyMeetingsEvent', {
                     // 'userId': resultResponse.userId,
                     'title': resultResponse[i].mtTheme,
                     // 'mtContent': resultResponse.mtContent,
                     'start': resultResponse[i].mtBeginTime,
                     'end': resultResponse[i].mtEndTime,
                     'event': resultResponse[i].mtFlag,
                     // 'roomName': resultResponse.rooms.roomName,
                    });
                    console.log('title:'+ resultResponse[i].mtTheme +'\n');
                    console.log('start:'+ resultResponse[i].mtBeginTime +'\n');
                    Ext.getStore("MyMeetingsSearch").add(curUser);
                }

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