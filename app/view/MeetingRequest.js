Ext.define('IBApp.view.MeetingRequest', {
    extend: 'Ext.form.Panel',
    extend:'Ext.Container',
    xtype: 'meetingrequestview',
  
    requires:[
    		'Ext.form.FieldSet',
        'Ext.field.DatePicker',
        'Ext.MessageBox',
        'Ext.ActionSheet',
        'Ext.ux.field.DateTimePicker',
        'Ext.ux.picker.DateTime',
        'IBApp.store.PlaceType'
    ],
  
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
        	title: '会议详情',
        	items: [backButton]
        };

        /*会议名称*/
        var meetingNameText = {
        	xtype: 'textfield',
        	name: 'meetingName',
        	label: '名称',
          placeHolder:'会议名称'
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
        
        /* 地点 */
        var placeTypeSelector = {
        	xtype: 'selectfield',
        	name: 'meetingType',
        	label: '地点',
            store: {xtype: 'placetypestore'},
            valueField: 'id',
            displayField: 'type',
        };
        /*组织者*/
        var organizerNameText = {
        	xtype: 'textfield',
        	name: 'organizerName',
        	label: '组织者',
          placeHolder:'张三'
        };
        
        /*与会人员*/
        var participatorNameText = {
        	xtype: 'textfield',
        	name: 'participatorName',
        	label: '与会人员',
          placeHolder:'李四、张某某、蒋某'
        };
        
        /*服务*/
        var serviceText = {
        	xtype: 'textfield',
        	name: 'service',
        	label: '服务',
          placeHolder:'茶水、投影仪、话筒、白板笔、签到表'
        };
 
        this.add([
        	topToolbar,
        	{
        		xtype: 'fieldset',
        		title: '会议表单',
        		items: [
        			meetingNameText,
        			startDateTime,
        			endDateTime,
        			placeTypeSelector,
        			organizerNameText,
        			participatorNameText,
        			serviceText,
        			
        		]
        	},  
        	
        	{
        		
        		html: [
                        
                        '<h1>会议摘要</h1>',
                        "<p>关于开展创建学习型、创新型、服务型党组织活动的通知 ",
                        "活动的主要内容是参观铁道博物馆，电影博物馆和798艺术区。</p>",
                       
                    ].join(""),
            
        	}, 	
        ]);
    },

    onBackButtonTap: function() {
    	this.fireEvent("meetingbackToMainMenuCommand");
    },

    
});       
        
    
