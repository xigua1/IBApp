Ext.define('IBApp.view.Search', {
    extend: 'Ext.form.Panel',
    xtype: 'searchview',
  
    requires:[
    	'Ext.form.FieldSet',
        'Ext.dataview.List',
        'IBApp.view.SearchList',
    ],
  
   config:{
        scrollable:'vertical',
        fullscreen: true,
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

        var searchButton = {
            xtype: 'button',
            ui: 'action',
            iconCls: 'search',
            handler: this.onSearchTap,
        	scope: this
            
        };

        var searchragion = {
            xtype: 'searchfield',
            itemId: 'searchfielId',
            Width :'300px',
            placeHolder: '会议室名称/主办单位/会议主题',
           
        };
     
        this.add([
        	{
                xtype: 'toolbar',
                docked: 'top', 
                centered:true,
                items: [
                    backButton,
                    searchragion,
                    searchButton,
                ]
        	}, 
            {
                xtype: 'searchlist',
                itemId: 'searchlistid',
            },
        	
        ]);
    },

    onBackButtonTap: function() {
        this.fireEvent("SearchToMyMeetingsCommand");
    },

    onSearchTap:function() {
        var me = this;
	    var keywordid= me.down('#searchfielId');
	      
	    var keyword = keywordid.getValue();
    	me.fireEvent('SearchCommand', me, keyword);
        
    },
});       
        
    
