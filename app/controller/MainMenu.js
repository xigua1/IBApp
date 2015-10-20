Ext.define("IBApp.controller.MainMenu", {
    extend: "Ext.app.Controller",
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            mainMenuView: 'mainmenuview',
            roomBookingView: 'roombookingview',
            roomBookSuccessView: 'roombooksuccessview'
        },
        control: {
        	mainMenuView: {
        		roomBookingCommand: 'onRoomBookingCommand'
        	},
        	roomBookingView: {
        		backToMainMenuCommand: 'onBacktoMainMenuCommand',
        	},
            roomBookSuccessView: {
                backButtonCommand: 'activateMainMenuView'
            }
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

    onBacktoMainMenuCommand: function() {
    	this.activateMainMenuView();
    },

    activateMainMenuView: function() {
    	Ext.Viewport.animateActiveItem(this.getMainMenuView(), this.getSlideRightTransition());
    }

});