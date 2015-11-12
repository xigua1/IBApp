Ext.define("IBApp.controller.RoomBooking", {
    extend: "Ext.app.Controller",
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            roomBookingView: 'roombookingview',
            roomSearchResultView: 'roomsearchresultview',
            roomBookSuccessView: 'roombooksuccessview',
        },
        control: {
        	roomBookingView: {
                mtTypeChangeCommand: 'onMtTypeChangeCommand',
        		roomSearchSubmitCommand: 'onRoomSearchSubmitCommand'
        	},
            roomSearchResultView: {
                backButtonCommand: 'onBackButtonCommand',
                roomBookButtonCommand: 'onRoomBookButtonCommand'
            },
            roomBookSuccessView: {
                backButtonCommand: 'onBacktoMainMenuCommand',
            	modifyMeetingInfoButtonCommand: 'onModifyMeetingInfoButtonCommand',
            }
        },
        routes: {
            'roomsearchresult': 'showRoomSearchResultView',
            'roombooksuccess': 'showRoomBookSuccessView',
        }
    },

    showRoomSearchResultView: function() {
        Ext.Viewport.animateActiveItem(this.getRoomSearchResultView(), 'fade');
    },

    showRoomBookSuccessView: function() {
        Ext.Viewport.animateActiveItem(this.getRoomBookSuccessView(), 'fade');
    },

    onMtTypeChangeCommand: function(view, mtTypeId) {
        var me = this;
        var devices = null, services = null;

        var urlDeviceType = 'http://10.2.49.252:8080/mtservice/restService/0.1/baDevType/devTypeList/' + mtTypeId;
        Ext.Ajax.request({
            url: urlDeviceType,
            method: 'GET',
            disableCaching: false,
            success: function (response) {
                devices = Ext.JSON.decode(response.responseText);
                me.getRoomBookingView().showDevices(devices);
            },
            failure: function (response) {
                me.getRoomBookingView().showMessages('获取设备列表失败');
            }
        });

        var urlServiceType = 'http://10.2.49.252:8080/mtservice/restService/0.1/mtService/mtServiceList/' + mtTypeId;
        Ext.Ajax.request({
            url: urlServiceType,
            method: 'GET',
            disableCaching: false,
            success: function (response) {
                services = Ext.JSON.decode(response.responseText);
                me.getRoomBookingView().showServices(services);
            },
            failure: function (response) {
                me.getRoomBookingView().showMessages('获取服务列表失败');
            }
        });
    },

    onRoomSearchSubmitCommand: function (view, obj) {
        console.log(obj);
        if (obj.attendNum == null) {
            this.getRoomBookingView().showMessages('需要填写与会人数');
            return;
        }

        var userId = Ext.getStore("UserInfo").getAt(0).get('userId');
        var strDevTypeIds = Ext.JSON.encode(obj.devTypeIds);
        var strBeginTime = Ext.JSON.encodeDate(obj.beginDate);
        var strEndTime = Ext.JSON.encodeDate(obj.endDate);
        console.log(strDevTypeIds);
        console.log(strBeginTime);

        var urlGetRecommendMtRoom = 'http://10.2.49.252:8080/mtservice/restService/0.1/mtRoom/recommendList/'+userId+'/null/'+obj.mtTypeId+'/'+obj.devTypeIds+'/'+obj.attendNum+'/'+obj.beginDate+'/'+obj.endDate;
        console.log(urlGetRecommendMtRoom);
        Ext.Ajax.request({
            url: urlGetRecommendMtRoom,
            method: 'GET',
            disableCaching: false,
            success: function (response) {
                recommendRooms = Ext.JSON.decode(response.responseText);
                console.log(recommendRooms);
            },
            failure: function (response) {
                // me.getRoomBookingView().showMessages('访问失败');
            }
        });

        // this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'roomsearchresult'}));
    },

    onBackButtonCommand: function (){
        window.history.go(-1);
    },

    onRoomBookButtonCommand: function (){
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'roombooksuccess'}));
    },
    
    onModifyMeetingInfoButtonCommand: function () {
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'meetingrequest'}));
    },

    onBacktoMainMenuCommand: function() {
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'mainmenu'}));
    },

});