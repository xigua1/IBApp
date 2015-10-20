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
    ],
  
  
    config: {
       
        title:'Requestpage',
        iconCls:'user',

        padding:20,
        scrollable:true,
        layout:{
        		type:'vbox',
        		pack:'top',
        		align:'stretch'
        },
        
        defaults:{
            xtype:'button',
            cls:'demobtn',
            margin:'10 0'	
        },
        
        
        
        items: [
         {
		            xtype: 'fieldset',
		            items: [                      
                 {
				             xtype: 'textfield',
				             name: 'name',
				             label: '会议名称',
				             placeHolder:'党群工作公告'                      
          			 },
          			 {
				             xtype: 'textfield',
				             name: 'name',
				             label: '主办方',
				             placeHolder:'第三党组织'                      
          			 },
          			 
                 {
                     xtype: 'datetimepickerfield',
                     picker: {
                     slotOrder: ['hour', 'minute']
                     },
	                    dateFormat: 'Y-m-d H:i',
	                    destroyPickerOnHide:true,
	                    label: '会议开始时间',
	                    name: 'datetime',
	                    value: new Date(),
	                    placeHolder: '请输入时间'
                 },
                 
                 {
                     xtype: 'datetimepickerfield',
                     picker: {
                     slotOrder: ['hour', 'minute']
                     },
	                    dateFormat: 'Y-m-d H:i',
	                    destroyPickerOnHide:true,
	                    label: '会议结束时间',
	                    name: 'datetime',
	                    value: new Date(),
	                    placeHolder: '请输入时间'
                 },
                       
         			  
                 {
                    xtype: 'selectfield',
                    name:'rank',
                    label:'会议服务',
                    options:[
			                  {
			                  	text:'投影仪',
			                  	value:'master'
			                  },
			                  {
			                    text:'白板笔',
			                    value:'journeyman'
			                  
			                  },
			                  {
			                  	text:'茶水',
			                    value:'apprentice'
			                  }
                    ]  
                 },               
              ],
         },
           
       
        {
         	   text:'提交申请',
         	   model:false,
         	   handler:function(){
             	       var items = [
             	       {
             	       	   text:'Delete draft',
             	       	   ui:'decline',
             	       	   scope:this,
             	       	   handler:function(){
             	       	       this.actions.hide();	
             	       	   }
             	       },
             	       {
             	       	   text:'Save draft',
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
         	   }              
       },
    ]  
    }
});
