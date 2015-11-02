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
          	slotOrder: ['year','month','day','hour','minute'],
            doneButton: '确定',
            cancelButton: '取消',
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
        		slotOrder: ['year','month','day','hour','minute'],
            doneButton: '确定',
            cancelButton: '取消',
        	}
        };
        
        /* 地点 */
        var placeTypeText = {
          xtype: 'textfield',
        	name: 'location',
        	label: '地点',
          id:'placeTypeTextid',
          readOnly:true,
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
        };

        this.add([
        	topToolbar,
          {
            xtype: 'fieldset',
            items: [
              meetingStatusLabel,
              meetingNameText,
              startDateTime,
              endDateTime,
              {
                xtype: 'panel',
                items: [
                  placeTypeText,
                  {xtype: 'button',
                  id: 'placeModifyBtn',
                  style: 'position: absolute; width:50px; left:75%; top:5px; border:none',
                  hidden: true,
                  text: '修改',
                  scope: this,
                  handler: this.onPlaceModifyBtn,
                  }
                ]
              },
              organizerNameText,
              {
                xtype: 'panel',
                items: [
                  participatorNameText,
                  {xtype: 'button',
                  id: 'participatorModifyBtn',
                  style: 'position: absolute; width:50px; left:75%; top:5px; border:none',
                  hidden: true,
                  text: '修改',
                  scope: this,
                  handler: this.onParticipatorModifyBtn,
                  }
                ]
              },
              {
                xtype: 'panel',
                items: [
                  serviceText,
                  {xtype: 'button',
                  id: 'serviceModifyBtn',
                  style: 'position: absolute; width:50px; left:75%; top:5px; border:none',
                  hidden: true,
                  text: '修改',
                  scope: this,
                  handler: this.onServiceModifyBtn,
                  }
                ]
              },
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
        var placeMB = me.down('#placeModifyBtn');
        var organizerNT = me.down('#organizerNameTextid');
        var participatorMB = me.down('#participatorModifyBtn');
        var serviceMB = me.down('#serviceModifyBtn');
        var requestB = me.down('#requestBottonid');
        var meetingT = me.down('#meetingTextid');

        MeetingNT.setReadOnly(false);
        startDT.setReadOnly(false);
        endDT.setReadOnly(false);
        placeMB.setHidden(false);
        // organizerNT.setReadOnly(false);  /*不允许修改会议组织者*/
        participatorMB.setHidden(false);
        serviceMB.setHidden(false);
        requestB.setHidden(false);
        meetingT.setReadOnly(false);

        this.actions.hide(); 

    },

    onNoEditButtonTap:function(){
        var me = this;
        var MeetingNT = me.down('#meetingNameTextid');
        var startDT = me.down('#startDateTimeid');
        var endDT = me.down('#endDateTimeid');
        var placeMB = me.down('#placeModifyBtn');
        var organizerNT = me.down('#organizerNameTextid');
        var participatorMB = me.down('#participatorModifyBtn');
        var serviceMB = me.down('#serviceModifyBtn');
        var requestB = me.down('#requestBottonid');
        var meetingT = me.down('#meetingTextid');

        MeetingNT.setReadOnly(true);
        startDT.setReadOnly(true);
        endDT.setReadOnly(true);
        placeMB.setHidden(true);
        // organizerNT.setReadOnly(true);
        participatorMB.setHidden(true);
        serviceMB.setHidden(true);
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

    onPlaceModifyBtn: function() {

      // this.fireEvent("roomBookingCommand");
    },

    onParticipatorModifyBtn: function() {

    },

    onServiceModifyBtn: function() {

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
        
    
