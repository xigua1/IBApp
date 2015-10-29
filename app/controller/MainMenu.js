Ext.define("IBApp.controller.MainMenu", {
    extend: "Ext.app.Controller",
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            mainMenuView: 'mainmenuview',
            roomBookingView: 'roombookingview',
            myMeetingsView:'mymeetingsview',
        },
        control: {
        	mainMenuView: {
        		roomBookingCommand: 'onRoomBookingCommand',
        		MyMeetingsCommand:'onMyMeetingsCommand',
        	},
        	roomBookingView: {
        		backToMainMenuCommand: 'onBacktoMainMenuCommand',
        	},
            myMeetingsView: {
                MyMeetingsToMainMenuCommand: 'onBacktoMainMenuCommand',
            },
        },
        routes: {
            'mainmenu': 'showMainMenuView',
            'roombooking': 'showRoomBookingView',
            'mymeetings': 'showMyMeetingsView',
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

    onRoomBookingCommand: function () {
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'roombooking'}));
    },
    
    onMyMeetingsCommand: function () {
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'mymeetings'}));
    },

    onBacktoMainMenuCommand: function() {
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'mainmenu'}));
    },
});