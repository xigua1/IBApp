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

        var backButton = {
            xtype: 'button',
            ui: 'back',
            text: '首页',
            handler: this.onBackButtonTap,
            scope: this
        };

        var searchButton = {
            xtype: 'button',
            ui: 'action',
            iconCls: 'search',
            // text: '搜索',
            handler: this.onSearchButtonTap,
            scope: this
        };

    	var eventStore = Ext.create('IBApp.store.MyMeetingsEvent');

    	var calendar = new Ext.ux.TouchCalendarView({
            viewMode: 'month',
            weekStart: 0,
            value: new Date(),
            eventStore: eventStore,
            plugins: [Ext.create('Ext.ux.TouchCalendarSimpleEvents')]
        });

        var eventList = Ext.create('Ext.dataview.List', {
        	docked: 'bottom',
            onItemDisclosure: true,
        	height: 250,
            itemHeight: 70,
            style: 'border-top: 1px solid #f0f0f0',
        	itemTpl: ['<div class="list-item-title">{title}<span class="meeting-status {statusEn}">{status}</span></div>',
            '<div class="list-item-narrative">{event}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{location}</div>'
            ].join(""),
            emptyText: '<div class="notes-list-empty-text">没有会议</div>',
        	store: new Ext.data.Store({
                model: 'IBApp.model.MyMeetingsEvent',
                data: []
            }),

            listeners: {
                itemtap: { fn: this.onMeetingsListTap, scope: this },
                initialize: function(list) {
                    var today = Ext.Date.clearTime(new Date(), true).getTime();
                    calendar.eventStore.clearFilter();
                    calendar.eventStore.filterBy(function(record){
                        var startDate = Ext.Date.clearTime(record.get('start'), true).getTime(), endDate = Ext.Date.clearTime(record.get('end'), true).getTime();

                        return (startDate <= today) && (endDate >= today);
                    }, this);

                    list.getStore().setData(calendar.eventStore.getRange());
                }
            }
        });

        this.add([
        	calendar, 
        	{
                xtype: 'toolbar',
                docked: 'top',
                title: '我的会议',
                items: [
                    backButton,
                    { xtype: 'spacer' },
                    searchButton
                ]
        	}, 
        	eventList
        	]
        ); 

		calendar.on('selectionchange', function(calendarview, newDate, prevDate){
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

        eventList.on("itemtap",function(list,index,target,record,e,opt){  
        // var txt="yourname is "+record.get("name");
            // var panel=Ext.create("Ext.Panel",{
                // fullscreen:true,
                // html:txt,
                // items:[{
                // xtype:'toolbar',
                // docked:'top',
                // items:[{
                //     xtype:'button',
                //     ui:'back',
                //     text:'返回',
                //     handler:function(){ 
                //         Ext.Viewport.setActiveItem(calendarPanel);
                //         panel.destroy(); 
                //     }
                //   },

                //   ]
                // }]

            // });
            //添加到容器
            // Ext.Viewport.add(panel);
            //显示
            // Ext.Viewport.setActiveItem(panel);

        // var starttime = record.get("start"),
        //     endtime = record.get("end");

        // var nextpage = Ext.create('IBApp.view.RoomBookSuccess', function () {
        //     this.fireEvent('pushContentCommand',me,starttime,endtime);

        // });

        // Ext.Viewport.setActiveItem(nextpage);
            // this.fireEvent('pushContentCommand');
        // this.fireEvent('pushContentCommand',this, starttime, endtime);
    
           
 
        });
    },


    onPushContentCommand:function () {
        this.fireEvent('pushContentCommand');
    },


    onMeetingsListTap: function (list, index, target, record, e, eOpts) {
        this.fireEvent('meetingsListCommand', record);
    },


    onBackButtonTap: function() {
        this.fireEvent("MyMeetingsToMainMenuCommand");
        // this.fireEvent("pushContentCommand");
    },

    onSearchButtonTap: function() {

    },

});