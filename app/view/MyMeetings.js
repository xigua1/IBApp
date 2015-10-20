Ext.define('IBApp.view.MyMeetings',{
	extend: 'Ext.tab.Panel',
	extend: 'Ext.carousel.Carousel',
	xtype:'mymeetingsview',
	
	
	 requires:[
    		'Ext.ux.TouchCalendar',
    		'Ext.ux.TouchCalendarView',
    ],
  
  
    config: {
        
        title:'Calendar',
        iconCls:'user',

        fullscreen: true,
        layout: 'fit',
        
        
        items: [
            {
          	  xtype:'calendar',
          	  viewmode: 'day',
              weekStart: 1,
              value: new Date()
          	},
				    {
								xtype: 'toolbar',
								docked: 'top',
								items: [
								{
										xtype: 'button',
										text: 'Month View',
										handler: function(){
											
                    }
                
                },
								{
										xtype: 'button',
										text: 'Week View',
										handler: function(){
												
								    }
								}, 
								{
										xtype: 'button',
										text: 'Day View',
										handler: function(){								
												
										}
								}]
						},
				     
        ]
	   }
	
	});
	
