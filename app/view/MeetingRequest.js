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

        /*编辑按钮*/
        var editButton = {
            xtype:'button',
            text:'编辑',
            ui:'action',
            id:'edit',
            handler: this.onEditButtonTap,
            scope: this
        };

        var topToolbar = {
            xtype: 'toolbar',
            docked: 'top',
            title: '会议详情',
            items: [
            backButton,
            { xtype: 'spacer' },
            editButton
            ]
        };
        

        /*会议名称*/
        var meetingNameText = {
        	xtype: 'textfield',
        	name: 'meetingName',
        	label: '名称',
            id:'meetingNameTextid',
            readOnly:true,
            placeHolder:'会议名称'
        };
        
	    /* 会议开始时间 */
        var startDateTime = {
        	xtype: 'datetimepickerfield',
        	name: 'startDateTime24hrdt',
        	label: '开始时间',
            id:'startDateTimeid',
            readOnly:true,
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
            id:'endDateTimeid',
            readOnly:true,
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
            id:'placeTypeSelectorid',
            readOnly:true,
            store: {xtype: 'placetypestore'},
            valueField: 'id',
            displayField: 'type',
        };

        /*组织者*/
        var organizerNameText = {
        	xtype: 'textfield',
        	name: 'organizerName',
        	label: '组织者',
            id:'organizerNameTextid',
            readOnly:true,
          placeHolder:'张三'
        };
        
        /*与会人员*/
        var participatorNameText = {
        	xtype: 'textfield',
        	name: 'participatorName',
        	label: '与会人员',
            id:'participatorNameTextid',
            readOnly:true,
          placeHolder:'李四、张某某、蒋某'
        };
        
        /*服务*/
        var serviceText = {
        	xtype: 'textfield',
        	name: 'service',
        	label: '服务',
            id:'serviceTextid',
            readOnly:true,
            placeHolder:'茶水、投影仪、话筒、白板笔、签到表'
        };


        /*提交按钮*/
        var requestBotton = {
            xtype:'button',
            cls:'demobtn',
            id:'requestBottonid',
            margin:'10 0',
            hidden: true,
            text:'提交申请',
            model:false,
            handler:function(){
                   var items = [
                   {
                       text:'回复',
                       ui:'decline',
                       scope:this,
                       handler:function(){
                           this.actions.hide(); 
                       }
                   },
                   {
                       text:'编辑',
                       scope:this,
                       handler:function(){
                           this.actions.hide(); 
                       }
                   },
                   {
                       xtpye:'button',
                       text:'控制设备',
                       scope:this,
                       handler:function(){
                           this.actions.hide();     
                       }
                   },   
                   {
                       xtpye:'button',
                       text:'取消会议',
                       scope:this,
                       handler:function(){
                           this.actions.hide();     
                       }
                   },   
                       {
                       xtpye:'button',
                       text:'Cancel',
                       scope:this,
                       handler:function(){
                           this.actions.hide();     
                       }
                   }, 
                ];
               
                if(!this.actions){
                    this.actions = Ext.create('Ext.ActionSheet',{
                       items:items  
                   });
               }
               Ext.Viewport.add(this.actions);
               this.actions.show();
            },
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
            requestBotton,

        ]);
    },

    onBackButtonTap: function() {
    	this.fireEvent("meetingRequestToMainMenuCommand");
    },

    onEditButtonTap:function(){
        var me = this;
        var MeetingNT = me.down('#meetingNameTextid');
        var startDT = me.down('#startDateTimeid');
        var endDT = me.down('#endDateTimeid');
        var placeTS = me.down('#placeTypeSelectorid');
        var organizerNT = me.down('#organizerNameTextid');
        var participatorNT = me.down('#participatorNameTextid');
        var serviceT = me.down('#serviceTextid');
        var requestB = me.down('#requestBottonid');

        MeetingNT.setReadOnly(false);
        startDT.setReadOnly(false);
        endDT.setReadOnly(false);
        placeTS.setReadOnly(false);
        organizerNT.setReadOnly(false);
        participatorNT.setReadOnly(false);
        serviceT.setReadOnly(false);
        requestB.setHidden(false);

    }
});       
        
    
