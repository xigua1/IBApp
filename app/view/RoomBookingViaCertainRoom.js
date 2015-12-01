var roomInfo = '';

var mtTypeStore = Ext.create("Ext.data.Store", {
    proxy: {
        type: "ajax",
        url: 'http://10.2.49.250:8080/mtservice/restService/0.1/mtType/mtTypeListByRoom/',
        enablePagingParams: false,
        reader: {
            type: 'json',
        }
    },
    fields: [
        { name: 'mtTypeId', type: 'string' },
        { name: 'mtTypeName', type: 'string' },
    ],
    data: [
    ]
});

Ext.define("IBApp.view.RoomBookingViaCertainRoom", {
    extend: "Ext.form.Panel",
    requires: ['Ext.form.FieldSet', 'Ext.ux.field.DateTimePicker', 'IBApp.store.MeetingType','IBApp.store.UrlAddr', 'IBApp.view.EmptyRoomTable'],
    xtype: 'roombookingviacertainroomview',
    config:{
        scrollable: 'vertical',
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

        var topToolbar = {
        	xtype: 'toolbar',
        	docked: 'top',
        	title: '预定会议室',
        	items: [backButton]
        };

        /* 会议类型 */
        var meetingTypeSelector = Ext.create('Ext.field.Select', {
            name: 'mtTypeId',
            id: 'meetingTypeSelector',
            label: '会议类型',
            store: mtTypeStore,
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

        /* 会议地点 */
        var location = {
            xtype: 'textfield',
            id: 'locationTextfield',
            name: 'location',
            label: '地点',
        };

		/* 会议开始时间 */
        var startDateTime = {
        	xtype: 'textfield',
            id: 'beginTimeTextfield',
        	name: 'beginTime',
        	label: '开始时间',
        };

        /* 会议结束时间 */
        var endDateTime = {
        	xtype: 'textfield',
            id: 'endTimeTextfield',
        	name: 'endTime',
        	label: '结束时间',
        };

        this.add([
            topToolbar,
            attendanceEditor,
            meetingTypeSelector,
            location,
            startDateTime,
            endDateTime,
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
                text: '提交',
                handler: this.onSubmitButtonTap,
                scope: this
            }
        ]);

    },

    onBackButtonTap: function() {
    	this.fireEvent("backButtonTapCommand");
    },

    onSubmitButtonTap: function() {
        var formValuesObj = this.getValues(true, true);
        formValuesObj.userId = Ext.getStore("UserInfo").getAt(0).get('userId');

        if(formValuesObj.services != null) {
            for (var i=0; i < formValuesObj.services.length; i++) {
                var serv = this.down('#service'+i);
                var obj = new Object();
                obj.serviceName = serv.getLabel();
                obj.serviceNum = serv.getValue();
                if (obj.serviceNum == null) {obj.serviceNum = 0;};
                formValuesObj.services[i] = obj;
            }
        }
        this.fireEvent('meetingAddCommand', this, formValuesObj, roomInfo.split(':')[0], ' >  >  > '+roomInfo.split(':')[1]);
    },

    updateMeetingType: function(roomId) {
        var mtTypeSelector = this.down('#meetingTypeSelector');
        var URLServer = Ext.getStore("UrlAddr").getAt(0).get('urlServer');
        var urltmp = URLServer + '/mtType/mtTypeListByRoom/';
        mtTypeStore.getProxy().setUrl(urltmp + roomId);
        mtTypeStore.load();
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
    },

    showInfo: function(roomId, beginTime, endTime, devices) {
        roomInfo = roomId;
        this.down('#locationTextfield').setValue(roomId.split(':')[1]);
        this.down('#beginTimeTextfield').setValue(beginTime);
        this.down('#endTimeTextfield').setValue(endTime);

        this.showDevices(devices);
    },

});