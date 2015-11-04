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
		},
		routes: {
			'login': 'showLoginView',
		}
	},

	sessionId: null,

	showLoginView: function() {
		Ext.Viewport.animateActiveItem(this.getLoginView(), 'fade');
	},

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
		var url = 'http://10.2.49.254:8080/pactera-jeesite/restService/userservice/0.1/login/doGetAuthenticationInfo/' + userid + '/' + password;
		Ext.Ajax.request({
			// url: 'http://192.168.31.232/BackEndTest/Authority.php',
			url: url,
			method: 'GET',
			disableCaching: false,
			withCredentials: true,
    		useDefaultXhrHeader: false,
			// params: {
			// 	user: userid,
			// 	pwd: password
			// },
			success: function (response) {
				var loginResponse = Ext.JSON.decode(response.responseText);
				if (loginResponse.success === 'true') {
	                // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
	                sessionId = loginResponse.sessionId;

	                /* set userInfoStore */
	                var curUser = Ext.create('IBApp.model.UserInfo', {
	                	'id': loginResponse.id,
	                	'imgURL': './resources/icons/profile.png',
	                	'userName': loginResponse.userName,
	                	// 'userRole': loginResponse.userAuthority,
	                });
                    Ext.getStore("UserInfo").add(curUser);

	                me.signInSuccess('admin'/*curUser.get('userRole')*/);

	            } else {
	                me.signInFailure(loginResponse.erroMsg);
	            }
			},
			failure: function (response) {
				me.sessionId = null;
				me.signInFailure('登录失败...请重试.');
			}
		});

		// just for test, will be deleted after debug
		// me.signInSuccess();
	},

	signInSuccess: function (userRole) {
	    console.log('Signed in.');
	    var loginView = this.getLoginView();
	    mainMenuView = this.getMainMenuView();
	    loginView.setMasked(false);

	    /* setFunctionIcon via userRole */
	    mainMenuView.setFunctionIcon(userRole);
	    this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'mainmenu'}));
	},

	getSlideLeftTransition: function () {
	    return { type: 'slide', direction: 'left' };
	},

	getSlideRightTransition: function () {
	    return { type: 'slide', direction: 'right' };
	},

	signInFailure: function (message) {
	    var loginView = this.getLoginView();
	    loginView.showSignInFailedMessage(message.split('：', 2)[0]);
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

	    this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'login'}));
	}
});