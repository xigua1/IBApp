Ext.define('IBApp.controller.Login', {
	extend: 'Ext.app.Controller',
	config: {
		refs: {
			loginView: 'loginview',
			mainMenuView: 'mainmenuview'
		},
		control: {
			loginView: {
				signInCommand: 'onSignInCommand'
			},
			mainMenuView: {
				signOffCommand: 'onSignOffCommand'
			}
		}
	},

	sessionToken: null,

	onSignInCommand: function(view, username, password) {
		console.log('Username: ' + username + '\n' + 'Password: ' + password);

		var me = this,
		    loginView = me.getLoginView();

		if (username.length === 0 || password.length === 0) {
			loginView.showSignInFailedMessage('请输入用户名和密码.');
			return;
		}

		loginView.setMasked({
			xtype: 'loadmask',
			message: '登录中...'
		});

		/* 从后台进行验证 */
		// Ext.Ajax.request({
		// 	url: 'logoff.ashx',
		// 	method: 'post',
		// 	params: {
		// 		user: username,
		// 		pwd: password
		// 	},
		// 	success: function (response) {
		// 		var loginResponse = Ext.JSON.decode(response.responseText);
		// 		if (loginResponse.success === "true") {
	 //                // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
	 //                me.sessionToken = loginResponse.sessionToken;
	 //                me.signInSuccess();
	 //            } else {
	 //                me.signInFailure(loginResponse.message);
	 //            }
		// 	},
		// 	failure: function (response) {
		// 		me.sessionToken = null;
		// 		me.signInFailure('登录失败...请重试.');
		// 	}
		// });

		// just for test, will be deleted after debug
		me.signInSuccess();
	},

	signInSuccess: function () {
	    console.log('Signed in.');
	    var loginView = this.getLoginView();
	    mainMenuView = this.getMainMenuView();
	    loginView.setMasked(false);

	    Ext.Viewport.animateActiveItem(mainMenuView, this.getSlideLeftTransition());
	},

	getSlideLeftTransition: function () {
	    return { type: 'slide', direction: 'left' };
	},

	getSlideRightTransition: function () {
	    return { type: 'slide', direction: 'right' };
	},

	signInFailure: function (message) {
	    var loginView = this.getLoginView();
	    loginView.showSignInFailedMessage(message);
	    loginView.setMasked(false);
	},

	onSignOffCommand: function () {
	    var me = this;
	    // Ext.Ajax.request({
	    //     url: '../../services/logoff.ashx',
	    //     method: 'post',
	    //     params: {
	    //         sessionToken: me.sessionToken
	    //     },
	    //     success: function (response) {

	    //         // TODO: Implementation.
	    //     },
	    //     failure: function (response) {

	    //         // TODO: Implementation.
	    //     }
	    // });

	    Ext.Viewport.animateActiveItem(this.getLoginView(), this.getSlideRightTransition());
	}
});