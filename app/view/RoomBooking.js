Ext.define("IBApp.view.RoomBooking", {
    extend: "Ext.form.Panel",
    requires: ['Ext.form.FieldSet', 'Ext.ux.field.DateTimePicker', 'IBApp.store.MeetingType'],
    xtype: 'roombookingview',
    config:{
        scrollable:'vertical'
    },
    initialize: function () {

        this.callParent(arguments);

        var backButton = {
        	xtype: 'button',
        	ui: 'back',
        	text: '首页',
        	handler: this.onBackButtonTap,
        	scope: this
        };

        var topToolbar = {
        	xtype: 'toolbar',
        	docked: 'top',
        	title: '预定会议室',
        	items: [backButton]
        };

        /* 会议类型 */
        var meetingTypeSelector = {
        	xtype: 'selectfield',
        	name: 'meetingType',
        	label: '会议类型',
            store: {xtype: 'meetingtypestore'},
            valueField: 'id',
            displayField: 'type',
        };

        /* 与会人数 */
        var attendanceEditor = {
        	xtype: 'numberfield',
        	name: 'attendance',
        	label: '与会人数',
        	minValue: 1,
        	maxValue: 100,
        	increment: 1,
        };

		/* 会议开始时间 */
        var startDateTime = {
        	xtype: 'datetimepickerfield',
        	name: 'startDateTime24hrdt',
        	label: '开始时间',
        	value: new Date(),
        	dateTimeFormat: 'Y-m-d H:i',
        	picker: {
        		minuteInterval: 15,
        		ampm: false,
        		slotOrder: ['year','month','day','hour','minute']
        	}
        };

        /* 会议结束时间 */
        var endDateTime = {
        	xtype: 'datetimepickerfield',
        	name: 'endDateTime24hrdt',
        	label: '结束时间',
        	value: new Date(),
        	dateTimeFormat: 'Y-m-d H:i',
        	picker: {
        		minuteInterval: 15,
        		ampm: false,
        		slotOrder: ['year','month','day','hour','minute']
        	}
        };

        this.add([
        	topToolbar,
        	{
        		xtype: 'fieldset',
        		items: [
        			attendanceEditor,
        			meetingTypeSelector,
        			startDateTime,
        			endDateTime,
        		]
        	},
        	{
        		xtype: 'fieldset',
        		title: '所需设备',
        		defaults: {
        			xtype: 'checkboxfield',
        		},
        		items: [
        			{
        				name: 'touyingyi',
        				label: '投影仪',
        				value: 'touyingyi'
        			},
        			{
        				name: 'audio ',
        				label: '音响',
        				value: 'audio'
        			},
        			{
        				name: 'video',
        				label: '视频',
        				value: 'video'
        			},
        		]
        	},
        	{
        		xtype: 'button',
        		itemId: 'submitButton',
        		ui: 'action',
        		text: '搜索',
        		handler: this.onSubmitButtonTap,
                scope: this
        	}
        ]);
    },

    onBackButtonTap: function() {
    	this.fireEvent("backToMainMenuCommand");
    },

    onSubmitButtonTap: function() {
        this.fireEvent('roomSearchSubmitCommand');
    }
});