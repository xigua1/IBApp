var SearchListTemplate = new Ext.XTemplate(
	'<tpl for=".">',
	'<div class="list-item-title">{userId}<span class="meeting-status {statusEn}">{mtTypeId}</span></div>',
	'<div class="list-item-narrative">{mtTypeName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{attendNum}</div>',
	'</tpl>'
);



Ext.define('IBApp.view.SearchList', {
	extend: 'Ext.dataview.List',
    xtype: 'searchlist',
	requires: [
	'IBApp.store.MyMeetingsEvent',
	'Ext.data.Model'
	],


	config: {
        style: 'border-top: 1px solid #f0f0f0',
	    onItemDisclosure: true,
        height: 600,
        itemHeight: 90,
        scrollable: {
            disabled: true
        },
		store: 'MyMeetingsEvent',
        emptyText: '<div class="notes-list-empty-text">没有会议</div>',
		itemTpl: SearchListTemplate,
		listeners: {
		    itemtap: function (list, index, target, record, e, eOpts) {
		    	Ext.Msg.alert("list:" + record.get('start'));
		    },
		},
	}
});