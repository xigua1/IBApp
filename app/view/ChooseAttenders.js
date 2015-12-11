var attendersStore = Ext.create('Ext.data.Store', {
	model: 'IBApp.model.Attenders',
	data: [],
});

var curCol = 1;

Ext.define('IBApp.view.ChooseAttenders', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        "IBApp.model.Attenders",
    ],
    xtype: 'chooseattendersview',

    config: {
    },

    initialize: function () {
    	this.callParent(arguments);

        var backButton = {
            xtype: 'button',
            ui: 'back',
            handler: this.onBackButtonTap,
            scope: this
        };

        var searchBar = Ext.create('Ext.field.Search', {
            itemId: 'userNameSearchBar',
            placeHolder: '姓名',
            centered: true,
            width: '80%',
            // listeners: {
            //     change: { fn: this.onSearchBarBlur, scope: this },
            // }
        });

        var searchButton = {
            xtype: 'button',
            ui: 'action',
            text: '搜索',
            handler: this.onSearchTap,
            scope: this
        };

        var topToolbar = {
        	xtype: 'toolbar',
        	docked: 'top',
        	items: [backButton, searchBar, { xtype: 'spacer' },searchButton]
        };

        var inContactsFieldset = Ext.create('Ext.form.FieldSet', {
        	title: '内部常用联系人',
        	itemId: 'inContactsFieldset',
        });

        var outContactsFieldset = Ext.create('Ext.form.FieldSet', {
        	title: '外部常用联系人',
        	itemId: 'outContactsFieldset',
        });

        var searchResultFieldset = Ext.create('Ext.form.FieldSet', {
        	title: '搜索结果',
        	itemId: 'searchResultFieldset',
        	hidden: true
        });

        var chosenPersonPanel = Ext.create('Ext.Panel', {
        	id: 'chosenPersonPanel',
        	layout: 'hbox',
        	defaults: {
        	    xtype: 'panel',
        		flex: 1,
        		layout: 'vbox',
        	},
        	items: [
        		{
        			itemId: 'chosenPersonCol1',
        		},
        		{
        			itemId: 'chosenPersonCol2',
        		},
        		{
        			itemId: 'chosenPersonCol3',
        		},
        		{
        			itemId: 'chosenPersonCol4',
        		},
        	]
        });

        var button = Ext.create('Ext.Button', {
        	itemId: 'submitButton',
            ui: 'action',
            text: '确定',
            handler: this.onSubmitButtonTap,
            scope: this
        });

        this.add([
        	topToolbar,
        	inContactsFieldset,
        	outContactsFieldset,
        	searchResultFieldset,
        	chosenPersonPanel,
        	button
        ]);
    },

    onBackButtonTap: function() {
    	this.fireEvent("backToMeetingRequest", null,null);
    },

    showContacts: function(contactsArray, flag) {
    	var me = this;
    	var contactsFieldset = null, name = null;

    	if (flag == 1) {
    		contactsFieldset = this.down('#inContactsFieldset');
    		name = 'inContactsIds';
    	}
    	else if (flag == 2) {
    		contactsFieldset = this.down('#outContactsFieldset');
    		name = 'outContactsIds';
    	}

    	if (contactsArray != null) {
    		var arrLen = contactsArray.length;
    		contactsFieldset.removeAll();

    		for (var i=0; i < arrLen; i++) {
    		    var contact = Ext.create('Ext.field.Checkbox', {
    		        name: name,
    		        id: 'checkbox' + contactsArray[i].userId,
    		        label: contactsArray[i].userName + '(' + contactsArray[i].officeName + ')',
                    labelWidth: '80%',
    		        value: contactsArray[i].userId,
    		        listeners: {
    		            check: { fn: this.onContactChecked, scope: this },
    		            uncheck: { fn: this.onContactUnchecked, scope: this },
    		        }
    		    });

    		    contactsFieldset.add(contact);
    		}
    	};
    },

    showUserSearchList: function(userList) {
        var searchResultFieldset = this.down('#searchResultFieldset');
        searchResultFieldset.removeAll();

        if (userList != null) {
            var arrLen = userList.length;

            for (var i=0; i < arrLen; i++) {
                var contact = Ext.create('Ext.field.Checkbox', {
                    name: 'inContactsIds',
                    id: 'checkbox' + userList[i].userId,
                    label: userList[i].userName + '(' + userList[i].officeName + ')',
                    labelWidth: '80%',
                    value: userList[i].userId,
                    listeners: {
                        check: { fn: this.onContactChecked, scope: this },
                        uncheck: { fn: this.onContactUnchecked, scope: this },
                    }
                });

                searchResultFieldset.add(contact);
            }
        };
        searchResultFieldset.show();
    },

    showExistAttenders: function(store) {
    	var me = this;
    	attendersStore.removeAll();
    	var len = store.getCount();
        this.down('#searchResultFieldset').removeAll();
        this.down('#searchResultFieldset').hide();
    	this.down('#chosenPersonCol1').removeAll();
    	this.down('#chosenPersonCol2').removeAll();
    	this.down('#chosenPersonCol3').removeAll();
    	this.down('#chosenPersonCol4').removeAll();
    	curCol = 1;

    	for (var i = 0; i < len; i++) {
	    	var checkbox = me.down('#checkbox' + store.getAt(i).get('userId'));
	    	if (checkbox != null) {
	    		checkbox.check();
	    	}
	    	else {
	    		var chosenPersonCol = this.down('#chosenPersonCol'+curCol);
		    	var person = Ext.create('Ext.SegmentedButton', {
		    		id: 'btn' + store.getAt(i).get('userId'),
		    		items: [
		    			{
		    				text: 'x',
		    				width: 25
		    			},
		    			{
		    				text: store.getAt(i).get('userName'),
		    				disabled: true
		    			},
		    		],
		    		listeners: {
				        toggle: function(container, button, pressed){
				            if ((button.getText() == 'x') && pressed) {
				            	var userId = this.getId().replace('btn', '');

    			            	var checkbox = me.down('#checkbox' + userId);
    			            	if (checkbox != null) {
    			            		checkbox.uncheck();
    			            	}
    			            	else {
    			            		attendersStore.removeAt(attendersStore.findExact('userId', userId));
    			            		this.destroy();
    			            	}
				            };
				        }
				    }
		    	});
		    	chosenPersonCol.add(person);
		    	curCol ++;
		    	if (curCol > 4) {curCol = 1;};

		    	var at = Ext.create('IBApp.model.Attenders', {
		    		'userId': store.getAt(i).get('userId'),
		    		'userName': store.getAt(i).get('userName'),
		    		'flag': store.getAt(i).get('flag'),
		    	});
		    	attendersStore.add(at);
	    	}
    	};
    },

    onContactChecked: function ( checkbox, e, eOpts) {
    	var me = this;
        var SegmentedButton = me.down('#btn' + checkbox.getValue());
        
        if (SegmentedButton == null) {
    	    var chosenPersonPanel = this.down('#chosenPersonCol'+curCol);
            var person = Ext.create('Ext.SegmentedButton', {
                id: 'btn' + checkbox.getValue(),
                items: [
                    {
                        text: 'x',
                        width: 25
                    },
                    {
                        text: checkbox.getLabel().split('(')[0],
                        disabled: true
                    },
                ],
                listeners: {
                    toggle: function(container, button, pressed){
                        if ((button.getText() == 'x') && pressed) {
                            var userId = this.getId().replace('btn', '');

                            var checkbox = me.down('#checkbox' + userId);
                            if (checkbox != null) {
                                checkbox.uncheck();
                            }
                            else {
                                attendersStore.removeAt(attendersStore.findExact('userId', userId));
                                this.destroy();
                            }
                        };
                    }
                }
            });
            chosenPersonPanel.add(person);
            curCol ++;
            if (curCol > 4) {curCol = 1;};

            var flag = 1;
            if (checkbox.getName() == 'outContactsIds') {
                flag = 2;
            };
            var at = Ext.create('IBApp.model.Attenders', {
                'userId': checkbox.getValue(),
                'userName': checkbox.getLabel().split('(')[0],
                'flag': flag,
            });
            attendersStore.add(at);    
        };
    },

    onContactUnchecked: function (checkbox, e, eOpts) {
    	var userId = checkbox.getValue();
    	attendersStore.removeAt(attendersStore.findExact('userId', userId));

    	var person = this.down('#btn' + userId);
    	if (person != null) {
    		person.destroy();
    	};
    },

    onSubmitButtonTap: function() {
    	var mtAttenders = '';
    	var len = attendersStore.getCount();

    	for (var i = 0; i < len; i++) {
    		mtAttenders += attendersStore.getAt(i).get('userName') + ';';
    	};
    
	  	this.fireEvent("backToMeetingRequest", mtAttenders, attendersStore);
    },

    onSearchTap: function() {
        var userName = this.down('#userNameSearchBar').getValue();
        if (userName != null) {
            this.fireEvent("getUserByName", userName);
        };
    }
});