Ext.define('IBApp.view.MyMeetings', {
	extend: 'Ext.Panel',
	xtype:'mymeetingsview',	
	requires:[
			'Ext.dataview.List',
    		'Ext.ux.TouchCalendar',
    		'Ext.ux.TouchCalendarView',
    		'Ext.ux.TouchCalendarSimpleEvents'
    ],

    config: {
    	fullscreen: true,
    	layout: 'fit',   
    },

    initialize: function () {
    	this.callParent(arguments);

    	var eventStore = Ext.create('IBApp.store.MyMeetingEvent');

    	var calendar = new Ext.ux.TouchCalendarView({
            viewMode: 'month',
            weekStart: 0,
            value: new Date(),
            eventStore: eventStore,
            plugins: [Ext.create('Ext.ux.TouchCalendarSimpleEvents')]
        });

        var eventList = Ext.create('Ext.dataview.List', {
        	docked: 'bottom',
        	height: 110,
        	itemTpl: '{event} {title}',
        	store: new Ext.data.Store({
                model: 'IBApp.model.MyMeetingEvent',
                data: []
            })
        });

        this.add([
        	calendar, 
        	{
                xtype: 'toolbar',
                docked: 'top',
                items: [{
                    xtype: 'segmentedbutton',
                    allowMultiple: false,
                    items: [{
                        text: 'Month',
                        pressed: true,
                        handler: function(){
                            calendar.setViewMode('month');
                        }
                    }, {
                        text: 'Week',
                        handler: function(){
                            calendar.setViewMode('week');
                        }
                    }]
                }]
        	}, 
        	eventList
        	]
        );

		calendar.on('selectionchange', function(calendarview, newDate, prevDate){
		    console.log('selectionchange');
		    // var eventList = this.getDockedItems()[1];

		    calendar.eventStore.clearFilter();
		    calendar.eventStore.filterBy(function(record){
		        var startDate = Ext.Date.clearTime(record.get('start'), true).getTime(), endDate = Ext.Date.clearTime(record.get('end'), true).getTime();

		        return (startDate <= newDate) && (endDate >= newDate);
		    }, this);


		    eventList.getStore().setData(calendar.eventStore.getRange());
		});

		calendar.on('eventtap', function(event){
		    console.log('eventtap');
		});

		calendar.on('eventdragstart', function(draggable, eventRecord, e){
		    console.log('eventdragstart');
		});
		calendar.on('beforeeventdrop', function(draggable, eventRecord, e){
		    console.log('beforeeventdrop');
		    return true;
		});
		calendar.on('eventdrop', function(draggable, eventRecord, e){
		    console.log('eventdrop');
		});
		calendar.on('eventdrag', function(draggable, eventRecord, e){
		    console.log('eventdrag');
		});
    },
});