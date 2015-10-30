Ext.define("IBApp.model.MyMeetingsEvent", {
    extend: "Ext.data.Model",
	config: {
		fields: [
		{
			name: 'meetingId',
			type: 'string'
		}, {
			// 会议起止的时分格式显示
			name: 'event',
			type: 'string'
		}, {
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
		}, {
			name: 'statusEn',
			type: 'string'
		}, {
			name: 'abstract',
			type: 'string'
		}],
		validations: [
			{type: 'presence', field: 'id', message: 'id必须输入'},
			{type: 'presence', field: 'event', message: 'event必须输入'},
			{type: 'presence', field: 'title', message: '会议名称必须输入'},
			{type: 'presence', field: 'start', message: '会议开始时间必须输入'},
			{type: 'presence', field: 'end', message: '会议结束时间必须输入'},
			{type: 'presence', field: 'location', message: '会议地点必须输入'},
			{type: 'presence', field: 'organizer', message: '会议组织者必须输入'},
			{type: 'presence', field: 'participants', message: '与会者必须输入'},
			{type: 'presence', field: 'status', message: '会议状态必须输入'},
			{type: 'presence', field: 'statusEn', message: 'statusEn必须输入'},
		]
	}
});