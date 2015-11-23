Ext.define("IBApp.view.RoomBooking", {
    extend: "Ext.Panel",
    requires: ['Ext.form.FieldSet', 'Ext.ux.field.DateTimePicker', 'IBApp.store.MeetingType'],
    xtype: 'roombookingview',
    config:{
        scrollable: false,
        layout: 'vbox',
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

        var tagButton = Ext.create('Ext.SegmentedButton', {
            centered: true,
            items: [
                {
                    text: '快速推荐',
                    pressed: true
                },
                {
                    text: '查看空闲',
                }
            ],
            listeners: {
                toggle: function(container, button, pressed){
                   // alert("User toggled the '" + button.getText() + "' button: " + (pressed ? 'on' : 'off'));
                    if ((button.getText() == '快速推荐') && pressed) {
                        panelPages.setActiveItem(0);
                    }
                    else if ((button.getText() == '查看空闲') && pressed) {
                        panelPages.setActiveItem(1);
                    }
               }
           }
        });

        var topToolbar = {
        	xtype: 'toolbar',
        	docked: 'top',
        	// title: '预定会议室',
        	items: [backButton, tagButton]
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
        	name: 'beginTime',
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
        	name: 'endTime',
        	label: '结束时间',
        	value: new Date(),
        	dateTimeFormat: 'Y-m-d H:i',
        	picker: {
        		minuteInterval: 15,
        		ampm: false,
        		slotOrder: ['year','month','day','hour','minute']
        	}
        };

        var panelPages = Ext.create('Ext.Panel', {
            layout: {
                type: 'card',
                animation: 'fade',
            },
            flex: 1,
            items: [
                {
                    xtype: 'formpanel',
                    id: 'recommendBookingPanel',
                    items: [
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
                            xtype: 'fieldset',
                            title: '请选择所需服务',
                            itemId: 'servicesFieldset',
                        },
                        {
                            xtype: 'button',
                            itemId: 'submitButton',
                            ui: 'action',
                            text: '搜索',
                            handler: this.onSubmitButtonTap,
                            scope: this
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    html: '敬请期待',
                }
            ]
        });

        this.add([
        	topToolbar,
        	panelPages,
        ]);

        panelPages.setActiveItem(0);
    },

    onBackButtonTap: function() {
    	this.fireEvent("backToMainMenuCommand");
    },

    onSubmitButtonTap: function() {
        var panel = this.down('#recommendBookingPanel');
        var formValuesObj = panel.getValues(true, true);

        if(formValuesObj.services != null) {
            for (var i=0; i < formValuesObj.services.length; i++) {
                var serv = this.down('#service'+i);
                var obj = new Object();
                obj.serviceName = serv.getLabel();
                obj.serviceNum = serv.getValue();
                formValuesObj.services[i] = obj;
            }
        }
        this.fireEvent('roomSearchSubmitCommand', this, formValuesObj);
    },

    updateMeetingTypeSelector: function(userId) {
        // mtTypeSelector.getStore().getProxy().setExtraParam('userId', userId);
        /* 目前GET方法采用的地址拼接的方式 */
        var mtTypeSelector = this.down('#meetingTypeSelector');
        mtTypeSelector.getStore().getProxy().setUrl('http://10.2.49.250:8080/mtservice/restService/0.1/mtType/mtTypeListByUser/' + userId);
        // mtTypeSelector.getStore().getProxy().setUrl('http://10.2.20.69:8080/mtservice/restService/0.1/mtType/mtTypeListByUser/' + userId);
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

    showServices: function(servicesArray) {
        var serviceFieldset = this.down('#servicesFieldset');
        var arrLen = servicesArray.length;

        serviceFieldset.removeAll();

        for (var i=0; i < arrLen; i++) {
            var service = Ext.create('Ext.field.Number', {
                name: 'services',
                itemId: 'service'+i,
                label: servicesArray[i].serviceName,
                placeHolder: '个数',
            });
            serviceFieldset.add(service);
        }
    },

    showMessages: function(message) {
        Ext.Msg.alert(message);
    }
});