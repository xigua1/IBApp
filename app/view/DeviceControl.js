Ext.define('IBApp.view.DeviceControl', {
    extend: 'Ext.Panel',
    xtype: 'devicecontrolview',

    requires:[
    ],

    config:{
        layout: {
            type: 'vbox',
        },
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

        var sceneModeSelector = {
            xtype: 'selectfield',
            name: 'sceneMode',
            label: '情景模式',
            id:'sceneModeSelectorid',
            readOnly:false,
            align: 'center',
            options: [
                {type: '请选择情景模式...',  id: '1'},
                {type: '本地会议', id: '2'},
                {type: '投影会议', id: '3'},
                {type: '保洁模式', id: '4'},
                {type: '视频会议', id: '5'},
                {type: '电话会议', id: '6'},
                {type: '离开模式', id: '7'},
            ],
            // store: {xtype: 'scenemodestore'},
            valueField: 'id',
            displayField: 'type',
            listeners: {
                change: function() {
                    if (this.getValue() == '2') {
                        sceneModeControlPanel.setActiveItem(1);
                    }
                    else if (this.getValue() == '5') {
                        sceneModeControlPanel.setActiveItem(2);
                    }
                    else if (this.getValue() == '3') {
                        sceneModeControlPanel.setActiveItem(3);
                    }
                    else  {
                        sceneModeControlPanel.setActiveItem(0);
                    };
                },
            },
        };

        var localModeControllers = Ext.create('Ext.form.FieldSet', {
            title: '本地会议模式',
            items: [
                {
                    xtype: 'sliderfield',
                    id: 'volumeSlider',
                    label: '音量调节',
                    value: 30,
                    minValue: 0,
                    maxValue: 100
                },
                {
                    xtype: 'togglefield',
                    id:'soundOffToggle',
                    label: '静音',
                    name: 'soundOff',
                    value: 0,
                },
            ]
        });

        var videoModeControllers = Ext.create('Ext.form.FieldSet', {
            title: '视频会议模式',
            defaults: {
                xtype: 'togglefield',
            },
            items: [
                {
                    id:'cameraTrackToggle',
                    label: '摄像跟踪',
                    name: 'cameraTrack',
                    value: 0,
                },
                {
                    id:'syncProjectorToggle',
                    label: '同步显示投影仪',
                    name: 'syncProjector',
                    value: 0,
                },
                {
                    id:'videoServerToggle1',
                    label: '视频服务器',
                    name: 'videoServer1',
                    value: 1,
                },
                {
                    id:'recordedServerToggle1',
                    label: '录播服务器',
                    name: 'recordedServer1',
                    value: 1,
                }, 
            ]
        });

        var projectionModeControllers = Ext.create('Ext.form.FieldSet', {
            title: '投影会议模式',
            defaults: {
                xtype: 'togglefield',
            },
            items: [
                {
                    id:'zhuoChaVGA1Toggle',
                    label: '桌插VGA1',
                    name: 'zhuoChaVGA1',
                    value: 1,
                },
                {
                    id:'zhuoChaHDMI1Toggle',
                    label: '桌插HDMI1',
                    name: 'zhuoChaHDMI1',
                    value: 0,
                },
                {
                    id:'zhuoChaVGA2Toggle',
                    label: '桌插VGA2',
                    name: 'zhuoChaVGA2',
                    value: 0,
                },
                {
                    id:'zhuoChaHDMI2Toggle',
                    label: '桌插HDMI2',
                    name: 'zhuoChaHDMI2',
                    value: 0,
                },
                {
                    id:'TVLeftToggle1',
                    label: '电视左',
                    name: 'TVLeft1',
                    value: 1,
                },
                {
                    id:'TVRightToggle1',
                    label: '电视右',
                    name: 'TVRight1',
                    value: 1,
                },
                {
                    id:'videoServerToggle2',
                    label: '视频服务器',
                    name: 'videoServer2',
                    value: 1,
                },
                {
                    id:'recordedServerToggle2',
                    label: '录播服务器',
                    name: 'recordedServer2',
                    value: 1,
                },
            ]
        });

        // 保洁模式、离开模式没有相应的图示和控件
        // 电话会议模式？？

        var sceneModeControlPanel = Ext.create('Ext.Panel', {
            itemId: 'sceneModeControlPage',
            flex: 1,
            layout: {
                type: 'card',
                animation: 'fade',
            },
            defaults: {
                xtype: 'panel',
            },
            items: [
                {  /*blank page*/  },
                {
                    id: 'localModeControllersPanel',
                    items: [
                        {
                            xtype: 'img',
                            itemId: 'localModeDevStatusImage',
                            src: './resources/images/Default.png',
                            style: 'width:100%;height:80%;margin:auto',
                        },
                        {
                            xtype: 'button',
                            id: 'localModeMoreBtn',
                            text: '更多操作...',
                            style: 'width:100px;border:none',
                            handler: this.onMoreButtonTap,
                            scope: this
                        },
                        localModeControllers
                    ],
                },
                {
                    id: 'videoModeControllersPanel',
                    items: [
                        {
                            xtype: 'img',
                            itemId: 'videoModeDevStatusImage',
                            src: './resources/images/Default.png',
                            style: 'width:100%;height:80%;margin:auto',
                        },
                        {
                            xtype: 'button',
                            id: 'videoModeMoreBtn',
                            text: '更多操作...',
                            style: 'width:100px;border:none',
                            handler: this.onMoreButtonTap,
                            scope: this
                        },
                        videoModeControllers
                    ],
                },
                {
                    id: 'projectionModeControllersPanel',
                    items: [
                        {
                            xtype: 'img',
                            itemId: 'projectionModeDevStatusImage',
                            src: './resources/images/Default.png',
                            style: 'width:100%;height:80%;margin:auto',
                        },
                        {
                            xtype: 'button',
                            id: 'projectionModeMoreBtn',
                            text: '更多操作...',
                            style: 'width:100px;border:none',
                            handler: this.onMoreButtonTap,
                            scope: this
                        }, 
                        projectionModeControllers
                    ],
                }
            ]
        });

        var carouselControlPages = Ext.create('Ext.Carousel', {
            ui: 'dark',
            flex: 1,
            direction: 'horizontal',
            defaults: {
                styleHtmlContent: true,
                // style: 'background-color:grey',
            },
            items: [
                {
                    // 情景模式页
                    xtype: 'panel',
                    layout: {
                        type: 'vbox',
                    },
                    items: [
                        sceneModeSelector,
                        sceneModeControlPanel,
                    ]
                },
                {
                    // 投影控制页
                    xtype: 'fieldset',
                    itemId: 'projectionControllersPanel',
                    title: '投影控制',
                    items: [
                        {
                            xtype: 'togglefield',
                            id:'projectorToggle',
                            label: '投影仪',
                            name: 'projector',
                            value: 1,
                        },
                        {
                            xtype: 'segmentedbutton',
                            allowMultiple: false,
                            items: [
                                {
                                    text: '投影幕升'
                                },
                                {
                                    text: '投影幕停',
                                    // pressed: true
                                },
                                {
                                    text: '投影幕降'
                                }
                            ],
                            listeners: {
                                // toggle: function(container, button, pressed){
                                //     alert("User toggled the '" + button.getText() + "' button: " + (pressed ? 'on' : 'off'));
                                // }
                            }
                        }
                    ]
                },
                {
                    // 电视控制页
                    xtype: 'fieldset',
                    itemId: 'TVControllersPanel',
                    title: '电视控制',
                    defaults: {
                        xtype: 'togglefield',
                    },
                    items: [
                        {
                            id:'TVLeftToggle2',
                            label: '电视左',
                            name: 'TVLeft2',
                            value: 1,
                        },
                        {
                            id:'TVRightToggle2',
                            label: '电视右',
                            name: 'TVRight2',
                            value: 1,
                        },
                    ]
                },
                {
                    // 灯光环境控制页
                    xtype: 'fieldset',
                    itemId: 'LightsControllersPanel',
                    title: '灯光环境',
                    defaults: {
                        xtype: 'togglefield',
                    },
                    items: [
                        {
                            id:'allOnOff',
                            label: '全开全关',
                            name: 'allOnOff',
                            value: 0,
                        },
                        {
                            id:'daDengToggle',
                            label: '大灯',
                            name: 'daDeng',
                            value: 0,
                        },
                        {
                            id:'huanXingSheDengToggle',
                            label: '环形射灯',
                            name: 'huanXingSheDeng',
                            value: 0,
                        },
                        {
                            id:'liangCeSheDengToggle',
                            label: '两侧射灯',
                            name: 'liangCeSheDeng',
                            value: 0,
                        },
                        {
                            id:'diaoDingDengToggle',
                            label: '吊顶灯',
                            name: 'diaoDingDeng',
                            value: 0,
                        },
                        {
                            id:'xiQiangDengToggle',
                            label: '洗墙灯',
                            name: 'xiQiangDeng',
                            value: 0,
                        },
                        {
                            id:'fengJiToggle',
                            label: '风机',
                            name: 'fengJi',
                            value: 0,
                        },
                    ]
                },
            ],
            listeners: {
                activeitemchange: function(carousel, value, oldValue, eOpts) {
                    // console.log(value);
                    // console.log(oldValue);
                }
            }
        });

        this.add([
            topToolbar,
            carouselControlPages,
        ]);
    },


    onBackButtonTap: function() {
    	  this.fireEvent("backButtonCommand");
          // var me = this;
          // var pan = me.down('#sceneModeControlPage');
          // pan.setActiveItem(2);
    },

    onMoreButtonTap: function(btn, e, eOpts) {
        var me = this;
        var img = null;

        if (btn.getId() == 'localModeMoreBtn') {
            img = me.down('#localModeDevStatusImage');
        }
        else if (btn.getId() == 'videoModeMoreBtn') {
            img = me.down('#videoModeDevStatusImage');
        }
        else if (btn.getId() == 'projectionModeMoreBtn') {
            img = me.down('#projectionModeDevStatusImage');
        }
       
        if (btn.getText() == '更多操作...') {
            img.hide();
            btn.setText('收起');
        }
        else {
            img.show();
            btn.setText('更多操作...');
        }
    },

	onStartallButtonTap: function() {
    	var me = this;
        var device1tmp= me.down('#device1id');
		    var device2tmp= me.down('#device2id');
		    var device3tmp= me.down('#device3id');

		    device1tmp.setValue(1);
		    device2tmp.setValue(1);
		    device3tmp.setValue(1);
    },
}); 