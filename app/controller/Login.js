Ext.define('IBApp.controller.Login', {
	extend: 'Ext.app.Controller',
	requires: ['IBApp.store.UserInfo'],
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

	onSignInCommand: function(view, userid, password) {
		console.log('userid: ' + userid + '\n' + 'Password: ' + password);

		var me = this,
		    loginView = me.getLoginView();

		if (userid.length === 0 || password.length === 0) {
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
		// 		user: userid,
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

	    // set userInfoStore;
	    var curUser = Ext.create('IBApp.model.UserInfo', {
	    	'id': '80101234',
	    	'imgURL': './resources/icons/profile.png',
	    	'userName': '韩梅梅',
	    	'userRole': 'admin',
	    });
	    Ext.getStore("UserInfo").add(curUser);
	    /* setFunctionIcon via userRole */
	    mainMenuView.setFunctionIcon(curUser.get('userRole'));
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