Ext.define("IBApp.controller.MainMenu", {
    extend: "Ext.app.Controller",
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            mainMenuView: 'mainmenuview',
            roomBookingView: 'roombookingview',
            myMeetingsView:'mymeetingsview',
            roomBookSuccessView: 'roombooksuccessview',
            meetingRequestView:'meetingrequestview',
            deviceControlView:'devicecontrolview',
        },
        control: {
        	mainMenuView: {
        		roomBookingCommand: 'onRoomBookingCommand',
        		MyMeetingsCommand:'onMyMeetingsCommand',
        		MeetingRequestCommand:'onMeetingRequestCommand',
                
        	},
        	roomBookingView: {
        		backToMainMenuCommand: 'onBacktoMainMenuCommand',
        	},
            roomBookSuccessView: {
                backButtonCommand: 'activateMainMenuView'
            },
            meetingRequestView: {
                meetingRequestToMainMenuCommand:'activateMainMenuView',
                meetingRequestToMyMeetingsCommand:'onMeetingRequestToMyMeetingsCommand',
                meetingRequestToRoomBookSuccessCommand:'onMeetingRequestToRoomBookSuccessCommand',
                deviceControlViewCommand:'onDeviceControlViewCommand',

            },
            deviceControlView: {
                deviceControlToMeetingRequestCommand:'onDeviceControlToMeetingRequestCommand',
            },


        }
    },

    getSlideLeftTransition: function () {
        return { type: 'slide', direction: 'left' };
    },

    getSlideRightTransition: function () {
        return { type: 'slide', direction: 'right' };
    },

    onRoomBookingCommand: function () {
        Ext.Viewport.animateActiveItem(this.getRoomBookingView(), this.getSlideLeftTransition());
    },
    
    onMyMeetingsCommand: function () {
        Ext.Viewport.animateActiveItem(this.getMyMeetingsView(), this.getSlideLeftTransition());
    },
    
    onMeetingRequestToMyMeetingsCommand: function () {
        Ext.Viewport.animateActiveItem(this.getMyMeetingsView(), this.getSlideRightTransition());
    },

    onMeetingRequestCommand: function () {
        Ext.Viewport.animateActiveItem(this.getMeetingRequestView(), this.getSlideLeftTransition());
    },
    
    onBacktoMainMenuCommand: function() {
    	this.activateMainMenuView();
    },

    activateMainMenuView: function() {
    	Ext.Viewport.animateActiveItem(this.getMainMenuView(), this.getSlideRightTransition());
    },

    onDeviceControlToMeetingRequestCommand: function () {
        Ext.Viewport.animateActiveItem(this.getMeetingRequestView(), this.getSlideRightTransition());
    },

    onMeetingRequestToRoomBookSuccessCommand: function() {
        Ext.Viewport.animateActiveItem(this.getRoomBookSuccessView(), this.getSlideLeftTransition());
    },

    onDeviceControlViewCommand: function() {
        Ext.Viewport.animateActiveItem(this.getDeviceControlView(), this.getSlideLeftTransition());
    }

});