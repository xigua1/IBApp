Ext.define('IBApp.view.FuncIcon', {
	extend: 'Ext.Panel',
	requires: ['Ext.Img'],
	xtype: 'funciconview',

	config: {
		flex: 1,
		margin: 5,
		imageId: '',
		imageSrc: '',
		text: '',
	},

	initialize: function () {

	    this.callParent(arguments);

	    var image = Ext.create('Ext.Img', {
	    	itemId: this.config.imageId,
	    	src: this.config.imageSrc,
	    	style: 'width:100%;height:70%;margin:auto',
	    });

	    this.add([
        	image,
        ]);
	    this.setHtml(['<p style="text-align:center">',
	    	          this.config.text,
	    	          '</p>'].join(""));
	},

});