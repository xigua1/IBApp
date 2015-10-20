Ext.define('IBApp.view.MainMenu', {
	extend: 'Ext.Panel',
	requires: ['Ext.Img', 'IBApp.view.UserInfoList', 'IBApp.view.RoomBooking','IBApp.view.MeetingRequest'],
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
			},
			{
				xtype: 'panel',
				flex: 1,
				layout: 'hbox',
				defaults: {
					xtype: 'panel',
					flex: 1,
					margin: 5,
				},	
				items: [
					{
						items: [
							{
								xtype: 'image',
								itemId: 'myMeetings',
								src: './resources/icons/my_meeting.png',
								style: 'width:100%;height:80%;margin:auto',
							},
							{
								html: '<p style="text-align:center">我的会议</p>'
							}
						]				
					},
					{
						items: [
							{
								xtype: 'image',
								itemId: 'roomBooking',
								src: './resources/icons/book_room.png',
								style: 'width:100%;height:80%;margin:auto'
							},
							{
								html: '<p style="text-align:center">预定会议室</p>'
							}
						]
					},
					{
						items: [
							{
								xtype: 'image',
								itemId: 'scanningCode',
								src: './resources/icons/scan_code.png',
								style: 'width:100%;height:80%;margin:auto'
							},
							{
								html: '<p style="text-align:center">扫码签到</p>'
							}
						]
					}
				]
			},
			{
				xtype: 'panel',
				flex: 1,
				layout: 'hbox',
				defaults: {
					xtype: 'panel',
					flex: 1,
					margin: 5,
				},
				items: [
					{
						items: [
							{
								xtype: 'image',
								itemId: 'meetingRoomManage',
								src: './resources/icons/room_manage.png',
								style: 'width:100%;height:80%;margin:auto'
							},
							{
								html: '<p style="text-align:center">会议室管理</p>'
							}
						]
					},
					{
						items: [
							{
								xtype: 'image',
								itemId: 'serviceList',
								src: './resources/icons/serve_list.png',
								style: 'width:100%;height:80%;margin:auto'
							},
							{
								html: '<p style="text-align:center">服务任务</p>'
							}
						]
					},
					{
						items: [
							{
								xtype: 'image',
								itemId: 'more',
								src: './resources/icons/more.png',
								style: 'width:100%;height:80%;margin:auto'
							},
							{
								html: '<p style="text-align:center">更多</p>'
							}
						]
					}
				]
			},
			{
				id: 'funcsRow3',
				flex: 1,
				html: ''
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

});