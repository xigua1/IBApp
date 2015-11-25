



Ext.define("IBApp.store.MyMeetingsSearch", {
    extend: "Ext.data.Store",
    xtype: 'mymeetingssearchstore',
    config: {
        model: "IBApp.model.MyMeetingsEvent",
        data: [
        ]
     //    fields: ['name', 'img', 'text'],
	    // data: [
	    //     {
	    //         name: 'rdougan',
	    //         img: 'http://a0.twimg.com/profile_images/1261180556/171265_10150129602722922_727937921_7778997_8387690_o_reasonably_small.jpg',
	    //         text: 'JavaScript development'
	    //     }
	    // ]
    }
});