Ext.define("IBApp.model.UserInfo", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            { name: 'userId', type: 'string' },
            { name: 'imgURL', type: 'string'},
            { name: 'userName', type: 'string' },
            { name: 'userRoles', type: 'string' },
            { name: 'userPermissions', type: 'string' },
        ]
    }
});