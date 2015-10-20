Ext.define("IBApp.controller.MyMeetings", {
    extend: "Ext.app.Controller",
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            //roomBookingView: 'roombookingview',
            myMeetingsView: 'mymeetingsview',
        },
        control: {
        	myMeetingsView: {
        		//roomSearchSubmitCommand: 'onRoomSearchSubmitCommand'
        	},
            //roomSearchResultView: {
              //  backButtonCommand: 'onBackButtonCommand',
              //  roomBookButtonCommand: 'onRoomBookButtonCommand'
           // },
        }
    },

    getSlideLeftTransition: function () {
        return { type: 'slide', direction: 'left' };
    },

    getSlideRightTransition: function () {
        return { type: 'slide', direction: 'right' };
    },

    

});