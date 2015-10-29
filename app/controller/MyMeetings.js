Ext.define("IBApp.controller.MyMeetings", {
    extend: "Ext.app.Controller",
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            myMeetingsView: 'mymeetingsview',
            meetingRequestView:'meetingrequestview',
            deviceControlView:'devicecontrolview',
        },
        control: {
            myMeetingsView: {
                editNoteCommand:'onEditNoteCommand'
            },
            meetingRequestView: {
                meetingRequestToMyMeetingsCommand:'onMeetingRequestToMyMeetingsCommand',
                meetingRequestToRoomBookSuccessCommand:'onMeetingRequestToRoomBookSuccessCommand',
                deviceControlViewCommand:'onDeviceControlViewCommand',
            },
            deviceControlView: {
                deviceControlToMeetingRequestCommand:'onDeviceControlToMeetingRequestCommand',
            },
        },
        routes: {
            'meetingrequest': 'showMeetingRequestView',
            'devicecontrol': 'showDeviceControlView',
        }
    },

    showMeetingRequestView: function() {
        Ext.Viewport.animateActiveItem(this.getMeetingRequestView(), 'fade');
    },

    showDeviceControlView: function() {
        Ext.Viewport.animateActiveItem(this.getDeviceControlView(), 'fade');
    },

    onMeetingRequestToMyMeetingsCommand: function () {
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'mymeetings'}));
    },

    onDeviceControlToMeetingRequestCommand: function () {
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'meetingrequest'}));
    },

    onMeetingRequestToRoomBookSuccessCommand: function() {
        Ext.Msg.alert('会议内容修改成功！');
    },

    onDeviceControlViewCommand: function() {
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'devicecontrol'}));
    },

    onEditNoteCommand: function(list, record, target, index, evt, options) {
        //Ext.Msg.alert('starttime');
        var starttime = record.get("start"),
             endtime = record.get("end");

        console.log('starttime: ' + starttime + '\n' + 'endtime: ' + endtime);

        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {url: 'meetingrequest'}));
    }
});