Ext.define("IBApp.controller.MyMeetings", {
    extend: "Ext.app.Controller",
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            //roomBookingView: 'roombookingview',
            mainMenuView: 'mainmenuview',
            myMeetingsView: 'mymeetingsview',
            roomBookSuccessView: 'roombooksuccessview',
        },
        control: {
            myMeetingsView: {
                MyMeetingsToMainMenuCommand: 'onMyMeetingsToMainMenuCommand',
                pushContentCommand:'onPushContentCommand'
            },
           
        }
    },

    getSlideLeftTransition: function () {
        return { type: 'slide', direction: 'left' };
    },

    getSlideRightTransition: function () {
        return { type: 'slide', direction: 'right' };
    },

    onMyMeetingsToMainMenuCommand: function() {
        Ext.Viewport.animateActiveItem(this.getMainMenuView(), this.getSlideRightTransition());
    },
    
    onPushContentCommand: function(view,starttime,endtime) {
        Ext.Msg.alert('starttime');
        console.log('starttime: ' + starttime + '\n' + 'endtime: ' + endtime);
        Ext.Viewport.animateActiveItem(this.getRoomBookSuccessView(), this.getSlideLeftTransition());
        // Ext.Viewport.animateActiveItem(this.getMainMenuView(), this.getSlideRightTransition());
    }
});