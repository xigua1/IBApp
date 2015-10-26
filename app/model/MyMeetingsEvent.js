Ext.define("IBApp.model.MyMeetingsEvent", {
    extend: "Ext.data.Model",
	config: {
		fields: [
		{
			name: 'event',
			type: 'string'
		}, 
		{
			name: 'title',
			type: 'string'
		}, {
			name: 'start',
			type: 'date',
			dateFormat: 'c'
		}, {
			name: 'end',
			type: 'date',
			dateFormat: 'c'
		}, {
			name: 'location',
			type: 'string'
		}, {
			name: 'organizer',
			type: 'string'
		}, {
			name: 'participants',
			type: 'string'
		}, {
			name: 'services',
			type: 'string'
		}, {
			name: 'status',
			type: 'string'
		}]

	}
});