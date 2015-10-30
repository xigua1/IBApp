Ext.define('IBApp.view.MeetingRequest', {
    extend: 'Ext.form.Panel',
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
        	text: '后退',
        	handler: this.onBackButtonTap,
        	scope: this
        };

        /*编辑按钮*/
        var editButton = {
            xtype:'button',
            iconCls: 'more',
            ui:'action',
            id:'edit',
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
                       handler: this.onEditButtonTap,

                   },
                   {
                       xtpye:'button',
                       text:'控制设备',
                       scope:this,
                       handler: this.onControlDeviceTap,
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

        /* 会议详情表单各控件的name值与model保持一致，用于setRecord */      

        /*会议名称*/
        var meetingNameText = {
        	xtype: 'textfield',
        	name: 'title',
        	label: '名称',
          id:'meetingNameTextid',
          readOnly:true,
        };
        
	      /* 会议开始时间 */
        var startDateTime = {
          	xtype: 'datetimepickerfield',
          	name: 'start',
          	label: '开始时间',
            id:'startDateTimeid',
            readOnly:true,
          	// value: new Date(),
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
        	name: 'end',
        	label: '结束时间',
          id:'endDateTimeid',
          readOnly:true,
        	// value: new Date(),
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
          // xtype: 'textfield',
        	name: 'location',
        	label: '地点',
          id:'placeTypeSelectorid',
          readOnly:true,
          // value:'B0910 小型会议室',
          store: {xtype: 'placetypestore'},
          valueField: 'id',
          displayField: 'type',
          handler: this.onPlaceSelectTap,
          scope: this
        };

        /*组织者*/
        var organizerNameText = {
        	xtype: 'textfield',
        	name: 'organizer',
        	label: '组织者',
          id:'organizerNameTextid',
          readOnly:true,
        };
        
        /*与会人员*/
        var participatorNameText = {
        	xtype: 'textfield',
        	name: 'participants',
        	label: '与会人员',
          id:'participatorNameTextid',
          readOnly:true,
        };
        
        /*服务*/
        var serviceText = {
        	xtype: 'textfield',
        	name: 'services',
        	label: '服务',
          id:'serviceTextid',
          readOnly:true,
        };

        /*会议摘要*/
        var meetingText = {
            xtype: 'textareafield',
            label: '会议摘要',
            name: 'abstract',
            readOnly:true,
            id:'meetingTextid',
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
            handler: this.onSubmitButtonTap,
            scope: this
     
        };

        /*隐藏信息*/
        var meetingIdText = {
          xtype: 'hiddenfield',
          name: 'meetingId',
        };
        var eventText = {
          xtype: 'hiddenfield',
          name: 'event',
        };
        var statusText = Ext.create('Ext.field.Hidden', {
          name: 'status',
          id: 'statusText'
        });
        var statusEnText = {
          xtype: 'hiddenfield',
          name: 'statusEn',
          id: 'statusEnText'
        };

        var meetingStatusLabel = {
          xtype: 'label',
          id: 'meetingStatusLabel'
          // html: ['<p>',
          //   '</p>'
          // ].join(""),
          // cls: 'meeting-status-closed'
        };

        this.add([
        	topToolbar,
          meetingStatusLabel,
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
              meetingText,
              meetingIdText,
              eventText,
              statusText,
              statusEnText
            ]
          },
          requestBotton,

        ]);
    },

    onBackButtonTap: function() {
    	this.fireEvent("meetingRequestToMyMeetingsCommand");
      this.onNoEditButtonTap();
 
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
        var meetingT = me.down('#meetingTextid');

        MeetingNT.setReadOnly(false);
        startDT.setReadOnly(false);
        endDT.setReadOnly(false);
        placeTS.setReadOnly(false);
        organizerNT.setReadOnly(false);
        participatorNT.setReadOnly(false);
        serviceT.setReadOnly(false);
        requestB.setHidden(false);
        meetingT.setReadOnly(false);

        this.actions.hide(); 

    },

    onNoEditButtonTap:function(){
        var me = this;
        var MeetingNT = me.down('#meetingNameTextid');
        var startDT = me.down('#startDateTimeid');
        var endDT = me.down('#endDateTimeid');
        var placeTS = me.down('#placeTypeSelectorid');
        var organizerNT = me.down('#organizerNameTextid');
        var participatorNT = me.down('#participatorNameTextid');
        var serviceT = me.down('#serviceTextid');
        var requestB = me.down('#requestBottonid');
        var meetingT = me.down('#meetingTextid');

        MeetingNT.setReadOnly(true);
        startDT.setReadOnly(true);
        endDT.setReadOnly(true);
        placeTS.setReadOnly(true);
        organizerNT.setReadOnly(true);
        participatorNT.setReadOnly(true);
        serviceT.setReadOnly(true);
        requestB.setHidden(true);
        meetingT.setReadOnly(true);

        //this.actions.hide(); 
        /**/
        // this.fireEvent("meetingRequestToRoomBookSuccessCommand");

    },

    onSubmitButtonTap: function() {
    
      this.fireEvent("meetingRequestToRoomBookSuccessCommand");
      this.onNoEditButtonTap();
    },

    onPlaceSelectTap: function() {
      this.fireEvent("roomBookingCommand");
    },

    onControlDeviceTap: function() {
      this.fireEvent("deviceControlViewCommand");
      this.actions.hide(); 
      
    },

    modifyMeetingDetails: function(record) {
      this.setRecord(record);

      var str = this.down('#statusText').getValue();
      var strEn = this.down('#statusEnText').getValue();

      this.down('#meetingStatusLabel').setHtml([
          '<p>',
          str,
          '</p>'
        ].join(""));
      this.down('#meetingStatusLabel').setCls([
        'detail-meeting-status ',
        strEn
      ].join(""));
    }
});       
        
    
