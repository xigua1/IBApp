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
                editNoteCommand:'onEditNoteCommand'
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

    onEditNoteCommand: function(list, record, target, index, evt, options) {
        //Ext.Msg.alert('starttime');
        var starttime = record.get("start"),
             endtime = record.get("end");


        console.log('starttime: ' + starttime + '\n' + 'endtime: ' + endtime);


        
        Ext.Viewport.animateActiveItem(this.getRoomBookSuccessView(), this.getSlideLeftTransition());
        // Ext.Viewport.animateActiveItem(this.getMainMenuView(), this.getSlideRightTransition());
    }
});