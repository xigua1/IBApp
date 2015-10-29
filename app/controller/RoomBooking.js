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

    onRoomSearchSubmitCommand: function () {
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'roomsearchresult'}));
    },

    onBackButtonCommand: function (){
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'roombooking'}));
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