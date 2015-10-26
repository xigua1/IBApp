Ext.define('IBApp.view.DeviceControl', {
    extend: 'Ext.form.Panel',
    extend:'Ext.Container',
    xtype: 'devicecontrolview',

    requires:[
    	'Ext.form.FieldSet',
        'Ext.MessageBox',
        'IBApp.store.SceneMode',
    ],

    config:{
        scrollable:'vertical'
    },
    initialize: function () {

        this.callParent(arguments);

        var backButton = {
        	xtype: 'button',
        	ui: 'back',
        	text: '',
        	handler: this.onBackButtonTap,
        	scope: this
        };

		var startallButton = {
        	xtype: 'button',
        	ui: '',
        	text: '一键启动',
        	handler: this.onStartallButtonTap,
        	scope: this
        };


        var topToolbar = {
        	xtype: 'toolbar',
        	docked: 'top',
        	title: '设备控制',
        	items: [backButton]
        };

		/*会议室名称*/
        var RoomNameText = {
        	xtype: 'textfield',
        	name: 'RoomNameText',
        	label: '会议室',
            id:'RoomNameTextid',
            readOnly:true,
            value:'B0910 会议室'
          // placeHolder:'会议名称'
        };

        /* 地点 */
        var sceneModeSelector = {
        	xtype: 'selectfield',
        	name: 'sceneModer',
        	label: '情景模式',
            id:'sceneModeSelectorid',
            readOnly:false,
            store: {xtype: 'scenemodestore'},
            valueField: 'id',
            displayField: 'type',
            // handler: this.onPlaceSelectTap,
            scope: this
        };

        var device1 = {
		    xtype: 'togglefield',
		    name: 'device1',
		    id:'device1id',
		    value: 0,
		    label: '投影仪',
		    labelWidth: '40%'
		};

		var device2 = {
		    xtype: 'togglefield',
		    name: 'device2',
		    id:'device2id',
		    value: 0,
		    label: '灯光',
		    labelWidth: '40%'
		};

		var device3 = {
		    xtype: 'togglefield',
		    name: 'device3',
		    id:'device3id',
		    value: 0,
		    label: '窗帘',
		    labelWidth: '40%'
		};

        this.add([
        	topToolbar,
        	RoomNameText,
        	sceneModeSelector,
        	startallButton,
        	{
	        	xtype: 'fieldset',
	    		// title: 'B0910 会议室',
	    		items: [
					
	    			device1,
	        		device2,
	        		device3,
	    		]
    		},
        ])

    },


    onBackButtonTap: function() {
    	this.fireEvent("deviceControlToMeetingRequestCommand");
    },

	onStartallButtonTap: function() {
    	var me = this;
        var device1tmp= me.down('#device1id');
		var device2tmp= me.down('#device2id');
		var device3tmp= me.down('#device3id');

		device1tmp.setValue(1);
		device2tmp.setValue(1);
		device3tmp.setValue(1);

    },
}); 