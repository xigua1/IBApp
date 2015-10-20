Ext.define('IBApp.view.Login', {
	extend: 'Ext.form.Panel',
	requires: ['Ext.form.FieldSet', 'Ext.form.Password', 'Ext.Label', 'Ext.Img'],
	xtype: 'loginview',

	config: {
		title: 'Login',
		layout: {
			type: 'vbox',
			pack: 'center',
		},
		items: [
			{
				xtype: 'image',
				src: './resources/icons/profile.png',
				style: 'width:100px;height:100px;margin:auto'
			},
			{
				xtype: 'label',
				html: 'Login failed. Please enter the correct credentials.',
				itemId: 'signInFailedLabel',
				hidden: true,
				hideAnimation: 'fadeOut',
				showAnimation: 'fadeIn',
				style: 'color:#990000;margin:5px 0px;'
			},
			{
				xtype: 'fieldset',
				items: [
					{
						xtype: 'textfield',
						itemId: 'userNameTextField',
						placeHolder: '用户名',
						name: 'userNameTextField',
						required: true
					},
					{
						xtype: 'passwordfield',
						itemId: 'passwordTextField',
						placeHolder: '密码',
						name: 'passwordTextField',
						required: true
					}
				]
			},
			{
				xtype: 'button',
				itemId: 'logInButton',
				ui: 'action',
				text: '登录',
				// handler: function() {
				// 	Ext.Msg.alert('success!');
				// }
			}
		],

		listeners: [{
			delegate: '#logInButton',
			event: 'tap',
			fn: 'onLogInButtonTap'
		}]
	},

	onLogInButtonTap: function () {
	    var me = this;
	    var usernameField = me.down('#userNameTextField'),
	        passwordField = me.down('#passwordTextField'),
	        label = me.down('#signInFailedLabel');

	    label.hide();
	    var username = usernameField.getValue(),
	        password = passwordField.getValue();

	    // Using a delayed task in order to give the hide animation above
	    // time to finish before executing the next steps.
	    var task = Ext.create('Ext.util.DelayedTask', function () {
	        label.setHtml('');
	        me.fireEvent('signInCommand', me, username, password);
	        usernameField.setValue('');
	        passwordField.setValue('');
	    });

	    task.delay(500);
	},

	showSignInFailedMessage: function (message) {
		var label = this.down('#signInFailedLabel');
		label.setHtml(message);
		label.show();
	}
});