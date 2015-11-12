Ext.define("IBApp.model.MyMeetingsEvent", {
    extend: "Ext.data.Model",

	config: {
		fields: [
		{
			//用户ID
			name: 'userId',
			type: 'string'
		}, 
		{
			//会议类型ID 
			name: 'mtTypeId',
			type: 'string'
		}, 
		{//会议类型名称
			name: 'mtTypeName',
			type: 'string'
		}, 
		{
			//参会人数
			name: 'attendNum',
			type: 'string',
		}, 
		// {
		// 	//主办单位ID
		// 	name: 'sponsorId',
		// 	type: 'string',
		// }, 
		// {
		// 	//主办单位名称
		// 	name: 'sponsorName',
		// 	type: 'string'
		// }, 
		// {
		// 	//会议组织者ID
		// 	name: 'organizerId',
		// 	type: 'string'
		// }, 
		// {
		// 	//会议组织者姓名
		// 	name: 'organizerName',
		// 	type: 'string'
		// }, 
		// {
		// 	//会议组织者手机
		// 	name: 'organizerPhone',
		// 	type: 'string'
		// }, 
		// {
		// 	//会议主题
		// 	name: 'mtTheme',
		// 	type: 'string'
		// }, 
		// {
		// 	//会议主讲人
		// 	name: 'speaker',
		// 	type: 'string'
		// }, 
		// {
		// 	//会议内容
		// 	name: 'mtContent',
		// 	type: 'string'
		// },
		// {
		// 	//迎宾词
		// 	name: 'welcomeWords',
		// 	type: 'string'
		// }, 
		// {
		// 	//会议开始时间
		// 	name: 'mtBeginTime',
		// 	type: 'string'
		// },
		// {
		// 	//会议结束时间
		// 	name: 'mtEndTime',
		// 	type: 'string'
		// }, 
		// {
		// 	//会议资料
		// 	name: 'mtData',
		// 	type: 'string'
		// },
		// {
		// 	//是否有服务
		// 	name: 'hasService',
		// 	type: 'string'
		// }, 
		// {
		// 	//是否有领导
		// 	name: 'hasBoos',
		// 	type: 'string'
		// },
		// {
		// 	//申报日期
		// 	name: 'postDate',
		// 	type: 'string'
		// },
		// {
		// 	//会议标识 1-正在审核；2-未开始；3-已结束；4-已取消；5-草稿；6-删除；
		// 	name: 'mtFlag',
		// 	type: 'string'
		// },
		// {
		// 	//会议二维码存放地址
		// 	name: 'mtQrcode',
		// 	type: 'string'
		// },
		// {
		// 	//是否为自己组织标识 1-自己组织；2-非自己组织 
		// 	name: 'isOrganizer',
		// 	type: 'string'
		// }],
		// associations: [{  
		// 	//会议所占会议室信息列表
  //           type: 'hasOne',   
  //           model: 'Rooms',   
  //           name:'rooms',   
  //           associationKey:'rooms'  
        ]  
	}
});

Ext.define('Rooms',{  
    extend: 'Ext.data.Model',  
  
    config: {  
        fields: [
		{
			//会议室ID
			name: 'roomId',
			type: 'string'
		}, 
		{
			//会议室名称
			name: 'roomName',
			type: 'string'
		}, 
		{
			//会议室门牌号
			name: 'roomNum',
			type: 'string'
		}]
    }  
});  