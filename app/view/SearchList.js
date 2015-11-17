var SearchListTemplate = new Ext.XTemplate(
	'<tpl for=".">',
	'<div class="list-item-title">{title}<span class="meeting-status {statusEn}">{event}</span></div>',
	'<div class="list-item-narrative">{start}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{end}</div>',
	'</tpl>'
);



Ext.define('IBApp.view.SearchList', {
	extend: 'Ext.dataview.List',
    xtype: 'searchlist',
	requires: [
	'IBApp.store.MyMeetingsSearch',
	],


	config: {
        style: 'border-top: 1px solid #f0f0f0',
	    onItemDisclosure: true,
        height: 600,
        itemHeight: 90,
        scrollable: {
            disabled: true
        },
		store: 'MyMeetingsSearch',
        emptyText: '<div class="notes-list-empty-text">没有会议</div>',
		itemTpl: SearchListTemplate,
		listeners: {
		    itemtap: function (list, index, target, record, e, eOpts) {
		    	Ext.Msg.alert("list:" + record.get('userId'));
		    },
		},
	}
});