Ext.define('IBApp.view.ChooseAttenders', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
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
            placeHolder: '姓名',
            centered: true,
            width: '80%',
        });

        var topToolbar = {
        	xtype: 'toolbar',
        	docked: 'top',
        	items: [backButton, searchBar]
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
        	title: '外部常用联系人',
        	itemId: 'searchResultFieldset',
        	hidden: true
        });

        var chosenPersonPanel = Ext.create('Ext.Panel', {
        	id: 'chosenPersonPanel',
        	layout: 'hbox',
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
    	this.fireEvent("backToMeetingRequest", null);
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
    		        value: contactsArray[i].userId,
    		        listeners: {
    		            check: { fn: this.onContactChecked, scope: this },
    		            uncheck: { fn: this.onContactUnchecked, scope: this },
    		        }
    		    });

    		    contactsFieldset.add(contact);
    		    console.log(contact.getId());
    		}
    	};
    },

    onContactChecked: function ( checkbox, e, eOpts) {
    	var me = this;
    	var chosenPersonPanel = this.down('#chosenPersonPanel');
    	var person = Ext.create('Ext.SegmentedButton', {
    		id: 'btn' + checkbox.getValue(),
    		items: [
    			{
    				text: checkbox.getLabel(),
    				disabled: true
    			},
    			{
    				text: 'X',
    				width: 30
    			}
    		],
    		listeners: {
		        toggle: function(container, button, pressed){
		            if ((button.getText() == 'X') && pressed) {
		            	var checkbox = me.down('#checkbox' + this.getId().replace('btn', ''));
		            	if (checkbox != null) {
		            		checkbox.uncheck();
		            	};
		            	this.destroy();
		            };
		        }
		    }
    	});
    	chosenPersonPanel.add(person);
    },

    onContactUnchecked: function (checkbox, e, eOpts) {
    	var person = this.down('#btn' + checkbox.getValue());
    	if (person != null) {
    		person.destroy();
    	};
    },

    onSubmitButtonTap: function() {
    	var me = this;
    	var mtAttenders = '';
    	var obj = this.getValues();

    	if (obj.inContactsIds != null) {
    		var len = obj.inContactsIds.length;
    		for (var i = 0; i < len; i++) {
    			var cb = this.down('#checkbox' + obj.inContactsIds[i]);
  				mtAttenders += cb.getLabel().split('(')[0] + ';';
    		};
    	};

	  	if (obj.outContactsIds != null) {
	  		var len = obj.outContactsIds.length;
	  		for (var i = 0; i < len; i++) {
	  			// var cb = me.down('#checkbox' + obj.outContactsIds[i]);
					// mtAttenders += cb.getLabel().split('(')[0] + ';';
						console.log(obj.outContactsIds[i]);
	  		};
	  	};

	  	this.fireEvent("backToMeetingRequest", mtAttenders);
    }
});