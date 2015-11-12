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
        var meetingTypeSelector = Ext.create('Ext.field.Select', {
            name: 'mtTypeId',
            itemId: 'meetingTypeSelector',
            label: '会议类型',
            store: {xtype: 'meetingtypestore'},
            valueField: 'mtTypeId',
            displayField: 'mtTypeName',
            listeners: {
                change: { fn: this.onMeetingTypeChange, scope: this },
            },
        });

        /* 与会人数 */
        var attendanceEditor = {
        	xtype: 'numberfield',
        	name: 'attendNum',
        	label: '与会人数',
            value: 3,
        	minValue: 1,
        	maxValue: 1000,
        	increment: 1,
        };

		/* 会议开始时间 */
        var startDateTime = {
        	xtype: 'datetimepickerfield',
        	name: 'beginDate',
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
        	name: 'endDate',
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
        		title: '请选择所需设备',
                itemId: 'devicesFieldset',
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
        var formValuesObj = this.getValues(true, true);  
        this.fireEvent('roomSearchSubmitCommand', this, formValuesObj);
    },

    updateMeetingTypeSelector: function(userId) {
        // mtTypeSelector.getStore().getProxy().setExtraParam('userId', userId);
        /* 目前GET方法采用的地址拼接的方式 */
        var mtTypeSelector = this.down('#meetingTypeSelector');
        mtTypeSelector.getStore().getProxy().setUrl('http://10.2.49.252:8080/mtservice/restService/0.1/mttype/mttypelist/' + userId);
        mtTypeSelector.getStore().load();
    },

    onMeetingTypeChange: function() {
        var mtTypeSelector = this.down('#meetingTypeSelector');
        var mtTypeId = mtTypeSelector.getValue();

        this.fireEvent('mtTypeChangeCommand', this, mtTypeId);
    },

    showDevices: function(devicesArray) {
        var deviceFieldset = this.down('#devicesFieldset');
        var arrLen = devicesArray.length;

        deviceFieldset.removeAll();

        for (var i=0; i < arrLen; i++) {
            var device = Ext.create('Ext.field.Checkbox', {
                name: 'devTypeIds',
                label: devicesArray[i].devTypeName,
                value: devicesArray[i].devTypeId
            });
            if (devicesArray[i].flag == 1) {
                device.check();
            }
            deviceFieldset.add(device);
        }
    },

    showMessages: function(message) {
        Ext.Msg.alert(message);
    }
});