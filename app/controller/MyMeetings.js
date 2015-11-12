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
        // console.log('keyword: ' + keyword + '\n');
        // var me = this;
        // /* 从后台进行验证 */
        // Ext.Ajax.request(
        // {
        //     url:'http://192.168.20.109:8005/BackEndTest/PlaceType.php',
        //     // url: 'http://10.2.49.254:8080/pactera-jeesite/restService/userservice/0.1/login/doPostAuthenticationInfoRS/',
        //     method: 'POST',
        //     disableCaching: false,
        //     withCredentials: true,
        //     useDefaultXhrHeader: false,
        //     params: {
        //         keyWord: keyword,
        //          // timeRange: timerange,
        //     },
        //     success: function (response) 
        //     {
        //         var resultResponse = Ext.JSON.decode(response.responseText);
        //         console.log('userId:'+ resultResponse.userId +'\n');
        //         /* set MyMeetingsEventStore */  
        //         var curUser = Ext.create('IBApp.model.MyMeetingsEvent', {
        //          'userId': resultResponse.userId,
        //          'mtTypeId': resultResponse.mtTypeId,
        //          'mtTypeName': resultResponse.mtTypeName,
        //          'attendNum': resultResponse.attendNum,
        //         });
        //         console.log('userId:'+ resultResponse.PlaceType[1].start+'\n');
        //         Ext.getStore("MyMeetingsEvent").add(curUser);

        //     }, 
        //     failure: function (response) 
        //     {
        //         me.sessionId = null;
        //         //me.signInFailure('登录失败...请重试.');
        //         console.log("连接失败");
        //     }
        // });  
    },
});