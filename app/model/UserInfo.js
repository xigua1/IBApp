Ext.define("IBApp.model.UserInfo", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            // 重要的唯一的id，与后台交互
            { name: 'userId', type: 'string' },
            { name: 'imgURL', type: 'string'},
            // 员工编号
            { name: 'userNo', type: 'string'},
            { name: 'userName', type: 'string' },
            { name: 'userRoles', type: 'string' },
            { name: 'userPermissions', type: 'string' },
        ]
    }
});