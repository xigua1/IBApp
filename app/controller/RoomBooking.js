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
        var devices;

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
                me.getRoomBookingView().showMessages('访问失败');
            }
        });
    },

    onRoomSearchSubmitCommand: function () {
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'roomsearchresult'}));
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