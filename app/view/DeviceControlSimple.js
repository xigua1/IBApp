var devStore = Ext.create('Ext.data.Store', {
	fields: [
	    { name: 'controlId', type: 'string' },
	    { name: 'instanceId', type: 'string' },
	    { name: 'instanceType', type: 'string' },
	    { name: 'instanceFlag', type: 'string' },
	    { name: 'instanceValue', type: 'string' },
	    { name: 'groupId', type: 'string' },
	    { name: 'groupName', type: 'string' },
	    { name: 'devName', type: 'string' },
	    { name: 'parentId', type: 'string' },
	],
    data: [
    ]
});

var groupNames = [];

Ext.define('IBApp.view.DeviceControlSimple', {
    extend: 'Ext.Panel',
    xtype: 'devicecontrolsimpleview',

    requires:[
    ],

    config:{
        layout: {
            type: 'vbox',
        },
        scrollable: 'vertical',
    },

    initialize: function () {

        this.callParent(arguments);

        var backButton = {
            xtype: 'button',
            ui: 'back',
            handler: this.onBackButtonTap,
            scope: this
        };

        var topToolbar = {
            xtype: 'toolbar',
            docked: 'top',
            title: '设备控制',
            items: [backButton]
        };

        this.add([
            topToolbar,
        ]);
    },

    onBackButtonTap: function() {
    	this.fireEvent("backButtonCommand");
    },

    showDevices: function(devInfoArray) {
    	var me = this;
    	/* 数据存储 */
    	groupNames = [];
        devStore.removeAll();
        this.removeAll();

    	for (var i = 0; i < devInfoArray.length; i++) {
    		devStore.add({
    			controlId: devInfoArray[i].groupId + devInfoArray[i].devId + devInfoArray[i].instanceFlag,
    			instanceId: devInfoArray[i].instanceId,
    			instanceType: devInfoArray[i].instanceType,
    			instanceFlag: devInfoArray[i].instanceFlag,
    			instanceValue : devInfoArray[i].instanceValue,
    			groupId: devInfoArray[i].groupId,
    			groupName: devInfoArray[i].groupName,
    			devName: devInfoArray[i].devName,
    			parentId: devInfoArray[i].parentId,
    		});

    		if (groupNames.indexOf(devInfoArray[i].groupName) == -1) {
    			groupNames.push(devInfoArray[i].groupName);
    		};
    	};

    	/* 数据提取，显示控件 */
    	for (var i = 0; i < groupNames.length; i++) {

    		devStore.clearFilter();
    		devStore.filter([
    		    {property: 'groupName', value: groupNames[i]},
    		    {property: 'instanceFlag', value: 'I'},
    		]);
    		var dataArray = devStore.getRange();

    		var fieldset = Ext.create('Ext.form.FieldSet', {
    			title: groupNames[i],
    		});

    		if ( groupNames[i].indexOf('B-ZC') != -1 ) {
    			for (var j = 0; j < dataArray.length; j++) {
    				if (dataArray[j].get('devName') == '情景模式') {
    					fieldset.setTitle('情景模式');
    					var sceneSelector = Ext.create('Ext.field.Select', {
				            itemId: dataArray[j].get('controlId').replace('I', ''),
				            options: [
				                {type: '进入模式',  id: '1'},
				                {type: '离开模式', id: '2'},
				            ],
				            valueField: 'id',
				            displayField: 'type',
				            listeners: {
				                change: function(selector, newValue, oldValue, eOpts) {
				                	var index = devStore.findExact('controlId', selector.getItemId()+'O');
				                	console.log(index);
				                	if (index != -1) {
				                		me.controlDev(devStore.getAt(index).get('parentId'), devStore.getAt(index).get('instanceType'), devStore.getAt(index).get('instanceId'), newValue);
				                	};
				                },
				            },
				        });
				        sceneSelector.setValue(dataArray[j].get('instanceValue'));
				        fieldset.add(sceneSelector); 
    				};
    			}
    		}
    		else if ( (groupNames[i].indexOf('三路灯光') != -1) || (groupNames[i].indexOf('四路灯光') != -1) ) {
    			for (var j = 1; j < dataArray.length; j++) {
    				var toggle = Ext.create('Ext.field.Toggle', {
    					label: dataArray[j].get('devName'),
    					itemId: dataArray[j].get('controlId').replace('I', ''),
    					value: parseInt(dataArray[j].get('instanceValue')),
    					listeners: {
    					    change: function(field, newValue, oldValue) {
				                var index = devStore.findExact('controlId', field.getItemId()+'O');
				                console.log(index);
				                if (index != -1) {
				                	me.controlDev(devStore.getAt(index).get('parentId'), devStore.getAt(index).get('instanceType'), devStore.getAt(index).get('instanceId'), newValue.toString());
				                };
				            }
    					}
    				});
    				fieldset.add(toggle);
    			};
    		}
    		else if (groupNames[i].indexOf('温控器') != -1) {
    			for (var j = 0; j < dataArray.length; j++) {
    				if (dataArray[j].get('devName') == '温控器开关') {
	    				var ctrl = Ext.create('Ext.field.Toggle', {
	    					label: dataArray[j].get('devName'),
	    					itemId: dataArray[j].get('controlId').replace('I', ''),
	    					value: parseInt(dataArray[j].get('instanceValue')),
	    					listeners: {
	    					    change: function(field, newValue, oldValue) {
					                var index = devStore.findExact('controlId', field.getItemId()+'O');
					                if (index != -1) {
					                	me.controlDev(devStore.getAt(index).get('parentId'), devStore.getAt(index).get('instanceType'), devStore.getAt(index).get('instanceId'), newValue.toString());
					                };
					            }
	    					}
	    				});
	    				fieldset.add(ctrl);
    				}
    				else if (dataArray[j].get('devName') == '温控器设置温度') {
						var ctrl = Ext.create('Ext.field.Spinner', {
							itemId: dataArray[j].get('controlId').replace('I', ''),
						    label     : dataArray[j].get('devName'),
						    value: dataArray[j].get('instanceValue'),
						    minValue  : 0,
						    maxValue  : 100,
						    stepValue : 2,
						    cycle     : true,
						    listeners: {
	    					    change: function(field, newValue, oldValue) {
					                var index = devStore.findExact('controlId', field.getItemId()+'O');
					                	if (index != -1) {
					                	me.controlDev(devStore.getAt(index).get('parentId'), devStore.getAt(index).get('instanceType'), devStore.getAt(index).get('instanceId'), newValue);
					                };
					            }
	    					}
						});
	    				fieldset.add(ctrl);
    				}
    				else if (dataArray[j].get('devName') == '温控器风量') {
    					var ctrl  = Ext.create('Ext.SegmentedButton', {
    						itemId: dataArray[j].get('controlId').replace('I', ''),
    						allowMultiple: false,
    						items: [
    						    {
    						        text: '低风',
    						        id: 'wind0001H',
    						    },
    						    {
    						        text: '中风',
    						        id: 'wind0002H',
    						        // pressed: true
    						    },
    						    {
    						        text: '高风',
    						        id: 'wind0003H',
    						    }
    						],
    						listeners: {
    						    toggle: function(container, button, pressed){
    						        var index = devStore.findExact('controlId', container.getItemId()+'O');
						        	if (index != -1) {
						        		me.controlDev(devStore.getAt(index).get('parentId'), devStore.getAt(index).get('instanceType'), devStore.getAt(index).get('instanceId'), button.getId().replace('wind',''));
    						        };
    						    }
    						}
    					});
    					fieldset.add(ctrl);
    				}
    				else if (dataArray[j].get('devName') == '温控器模式') {
    					var ctrl  = Ext.create('Ext.SegmentedButton', {
    						itemId: dataArray[j].get('controlId').replace('I', ''),
    						allowMultiple: false,
    						items: [
    						    {
    						        text: '制冷',
    						        id: 'temp0001H',
    						    },
    						    {
    						        text: '制热',
    						        id: 'temp0002H',
    						        // pressed: true
    						    },
    						    {
    						        text: '通风',
    						        id: 'temp0003H',
    						    }
    						],
    						listeners: {
    						    toggle: function(container, button, pressed){
    						        var index = devStore.findExact('controlId', container.getItemId()+'O');
						        	if (index != -1) {
						        		me.controlDev(devStore.getAt(index).get('parentId'), devStore.getAt(index).get('instanceType'), devStore.getAt(index).get('instanceId'), button.getId().replace('temp',''));
    						        };
    						    }
    						}
    					});
    					fieldset.add(ctrl);
    				};
    			};
    		}
    		else if (groupNames[i].indexOf('投影仪') != -1) {
    			for (var j = 0; j < dataArray.length; j++) {
    				var toggle = Ext.create('Ext.field.Toggle', {
    					label: dataArray[j].get('devName'),
    					itemId: dataArray[j].get('controlId').replace('I', ''),
    					value: parseInt(dataArray[j].get('instanceValue')),
    					listeners: {
    					    change: function(field, newValue, oldValue) {
				                var index = devStore.findExact('controlId', field.getItemId()+'O');
				                console.log(index);
				                if (index != -1) {
				                	me.controlDev(devStore.getAt(index).get('parentId'), devStore.getAt(index).get('instanceType'), devStore.getAt(index).get('instanceId'), newValue.toString());
				                };
				            }
    					}
    				});
    				fieldset.add(toggle);
    			};
    		}
    		else if (groupNames[i] == '投影幕') {
				var segmentedButton  = Ext.create('Ext.SegmentedButton', {
					allowMultiple: false,
					items: [
					    {
					        text: '上升',
					        id: '1',
					    },
					    {
					        text: '停止',
					        // pressed: true
					    },
					    {
					        text: '下降'
					    }
					],
					// pressedButtons: ['1'],
					listeners: {
					    // toggle: function(container, button, pressed){
					    //     alert("User toggled the '" + button.getText() + "' button: " + (pressed ? 'on' : 'off'));
					    // }
					}
				});
				fieldset.add(segmentedButton);
    		}
    		else {
    			continue;
    		}
    		me.add(fieldset);
    	};

    	devStore.clearFilter();
    },

    controlDev: function(parentId, instanceType, instanceId, instanceValue) {
    	this.fireEvent('ctrlDevCommand', parentId, instanceType, instanceId, instanceValue);
    },
});