Ext.define("IBApp.model.UserInfo", {
    extend: "Ext.data.Model",
    config: {
        idProperty: 'id',
        fields: [
            { name: 'id', type: 'int' },
            { name: 'imgURL', type: 'string'},
            { name: 'userName', type: 'string' },
            { name: 'userRoles', type: 'string' },
            { name: 'userPermissions', type: 'string' },
        ]
    }
});