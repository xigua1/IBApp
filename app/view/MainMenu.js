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
						align: 'right'
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

	setFunctionIcon: function(userRole) {
		if (userRole === 'admin') {
			/* 系统管理员权限 可使用所有功能模块 */
			var rowPanel1 = this.down('#rowPanel1');
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
			rowPanel1.removeAll();
			rowPanel1.add(funcIcon1);
			rowPanel1.add(funcIcon2);
			rowPanel1.add(funcIcon3);

			var rowPanel2 = this.down('#rowPanel2');
			var funcIcon4 = Ext.create('IBApp.view.FuncIcon', {
				imageId: 'meetingRoomManage',
				imageSrc: './resources/icons/room_manage.png',
				text: '会议室管理',
			});
			var funcIcon5 = Ext.create('IBApp.view.FuncIcon', {
				imageId: 'serve_list',
				imageSrc: './resources/icons/serve_list.png',
				text: '服务任务',
			});
			var funcIcon6 = Ext.create('IBApp.view.FuncIcon');
			rowPanel2.removeAll();
			rowPanel2.add(funcIcon4);
			rowPanel2.add(funcIcon5);
			rowPanel2.add(funcIcon6);
		}
		else if (userRole === 'normal') {
			var rowPanel1 = this.down('#rowPanel1');
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
			rowPanel1.removeAll();
			rowPanel1.add(funcIcon1);
			rowPanel1.add(funcIcon2);
			rowPanel1.add(funcIcon3);
		};
	},

});