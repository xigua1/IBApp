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
        // var userId = Ext.getStore("UserInfo").getAt(0).get('userId');
       
        // this.getRoomBookingView().updateMeetingTypeSelector(userId);
        
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'devctrroomlist'}));
    },
    
    onMyMeetingsCommand: function () {
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'mymeetings'}));
    },

    onBacktoMainMenuCommand: function() {
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'mainmenu'}));
    },
});