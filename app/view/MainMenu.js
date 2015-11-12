Ext.define('IBApp.view.MainMenu', {
	extend: 'Ext.Panel',
	requires: ['Ext.Img', 'IBApp.view.UserInfoList', 'IBApp.view.FuncIcon'],
	xtype: 'mainmenuview',

	config: {
		layout: {
			type: 'vbox',	
		},
		items: [
			{
				xtype: 'titlebar',
				docked: 'top',
				title: '智能楼宇系统',
				items: [
					{
						xtype: 'button',
						itemId: 'LogoutButton',
						text: '退出',
						align: 'right',
						// style: 'background-image: url(resources/images/qr_scanner.png); background-size: auto 100%; background-repeat:no-repeat;'
					}
				]
			},
			{
				xtype: 'userinfolist',
				itemId: 'profile',
				height: 120,
				itemHeight: 120,
				style: 'border-bottom: 1px solid #f0f0f0',
			},
			{
				xtype: 'panel',
				flex: 1,
				layout: 'hbox',
				itemId: 'rowPanel1',
			},
			{
				xtype: 'panel',
				flex: 1,
				layout: 'hbox',
				itemId: 'rowPanel2',
			},
			{
				xtype: 'panel',
				flex: 1,
				layout: 'hbox',
				itemId: 'rowPanel3',
			},
		],

		listeners: [
			{
				delegate: '#LogoutButton',
				event: 'tap',
				fn: 'onLogoutButtonTap'
			},
			{
				delegate: '#myMeetings',
				event: 'tap',
				fn: 'onMyMeetingsTap'
			},
			{
				delegate: '#roomBooking',
				event: 'tap',
				fn: 'onRoomBookingTap'
			},
			{
				delegate: '#scanningCode',
				event: 'tap',
				fn: 'onScanningCodeTap'
			},
			{
				delegate: '#deviceControl',
				event: 'tap',
				fn: 'onDeviceControlTap'
			}
		]
	},

	onLogoutButtonTap: function() {
		this.fireEvent('signOffCommand');
	},

	onMyMeetingsTap: function() {
		this.fireEvent('MyMeetingsCommand');
	},

	onRoomBookingTap: function() {
		this.fireEvent('roomBookingCommand');
	},

	onDeviceControlTap: function() {
		this.fireEvent('deviceControlCommand');
	},

	onScanningCodeTap: function() {
		cordova.plugins.barcodeScanner.scan(
	        function (result) {
				if (!result.cancelled) {
					Ext.Msg.show({
						title: '会议信息：',
						message: result.text,
						buttons: [
							{
								text: '签到',
								ui: 'action'
							},
							{
								text: '取消',
								itemId: 'cancel'
							}
						],
						fn: function(button) {
							if (button == '签到') {
								Ext.Msg.alert('会议签到成功');
							};
						}
					});
				};
	        }, 
	        function (error) {
	            alert("扫描失败: " + error);
	        }
	    );
	},

	setFunctionIcon: function(userRoles) {
		var rowPanel1 = this.down('#rowPanel1');
		var rowPanel2 = this.down('#rowPanel2');
		rowPanel1.removeAll();
		rowPanel2.removeAll();

		if (userRoles.indexOf('APP_ADMIN') != -1) {
			/* 系统管理员权限 可使用所有功能模块 */
			var funcIcon1 = Ext.create('IBApp.view.FuncIcon', {
				imageId: 'myMeetings',
				imageSrc: './resources/icons/my_meeting.png',
				text: '我的会议',
			});
			var funcIcon2 = Ext.create('IBApp.view.FuncIcon', {
				imageId: 'roomBooking',
				imageSrc: './resources/icons/book_room.png',
				text: '预定会议室',
			});
			var funcIcon3 = Ext.create('IBApp.view.FuncIcon', {
				imageId: 'scanningCode',
				imageSrc: './resources/icons/scan_code.png',
				text: '扫码签到',
			});
			rowPanel1.add(funcIcon1);
			rowPanel1.add(funcIcon2);
			rowPanel1.add(funcIcon3);

			var funcIcon4 = Ext.create('IBApp.view.FuncIcon', {
				imageId: 'deviceControl',
				imageSrc: './resources/icons/device_control.png',
				text: '设备控制',
			});
			var funcIcon5 = Ext.create('IBApp.view.FuncIcon', {
				imageId: 'meetingRoomManage',
				imageSrc: './resources/icons/room_manage.png',
				text: '会议室管理',
			});
			var funcIcon6 = Ext.create('IBApp.view.FuncIcon', {
				imageId: 'serverList',
				imageSrc: './resources/icons/server_list.png',
				text: '服务任务',
			});
			rowPanel2.add(funcIcon4);
			rowPanel2.add(funcIcon5);
			rowPanel2.add(funcIcon6);
		}
		else if (userRoles.indexOf('APP_USER') != -1) {
			var funcIcon1 = Ext.create('IBApp.view.FuncIcon', {
				imageId: 'myMeetings',
				imageSrc: './resources/icons/my_meeting.png',
				text: '我的会议',
			});
			var funcIcon2 = Ext.create('IBApp.view.FuncIcon', {
				imageId: 'roomBooking',
				imageSrc: './resources/icons/book_room.png',
				text: '预定会议室',
			});
			var funcIcon3 = Ext.create('IBApp.view.FuncIcon', {
				imageId: 'scanningCode',
				imageSrc: './resources/icons/scan_code.png',
				text: '扫码签到',
			});
			rowPanel1.add(funcIcon1);
			rowPanel1.add(funcIcon2);
			rowPanel1.add(funcIcon3);
		};
	},

});