Ext.define("IBApp.controller.MeetingRequest", {
    extend: "Ext.app.Controller",
    config: {
        refs: {
            // We're going to lookup our views by xtype.
          //  roomBookingView: 'roombookingview',
            meetingRequestView: 'meetingRequestview',
            //roomSearchResultView: 'roomsearchresultview',
            //roomBookSuccessView: 'roombooksuccessview'
        },
        control: {
        	meetingRequestView: {
        		//roomSearchSubmitCommand: 'onRoomSearchSubmitCommand'
        	},
            
        }
    },

    getSlideLeftTransition: function () {
        return { type: 'slide', direction: 'left' };
    },

    getSlideRightTransition: function () {
        return { type: 'slide', direction: 'right' };
    },

});