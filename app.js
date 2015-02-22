/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.define('Ext.AutocompleteField', {
    extend: 'Ext.field.Text',
    xtype: 'autocompletefield',
    config: {
        component: {
            xtype: 'input',
            type: 'text'
        }
    },

    currentSelectedValue: null,
    currentShownValue: '',
    isSelectedItem: false,

    setValue: function(newShownValue, newSelectedValue) {
        this.currentShownValue = newShownValue;
        this.getComponent().setValue(newShownValue);
        this.currentSelectedValue = newSelectedValue;
    },

    getValue: function(getShownValue) {
        return (getShownValue || !this.isSelectedItem ? this.getComponent().getValue() : this.currentSelectedValue);
    },

    initialize: function() {
        var that = this;

        if (!that.config.config.proxy || !that.config.config.proxy.url || !that.config.config.needleKey) throw new Error('Proxy and needleKey must be set with autocomplete config.');
        if (!that.config.config.labelKey) throw new Error('LabelKey must be defined with autocomplete config.');

        if (!that.config.config.resultsHeight) that.config.config.resultsHeight = 200;

        if (!Ext.ModelManager.getModel('AutocompleteResult')) {
            Ext.define('AutocompleteResult', {
                extend: 'Ext.data.Model',
                config: {
                    fields: ['id',that.config.config.labelKey]
                }
            });
        }

        this.resultsStore = Ext.create('Ext.data.Store', {
            model: 'AutocompleteResult',
            config: {
                autoLoad: false
            }
        });

        this.resultsStore.setProxy(that.config.config.proxy);

        this.resultsList = Ext.create('Ext.List', {
            renderTo: this.getComponent().element.dom,
            store: that.resultsStore,
            margin: 2,
            itemTpl: '{name}'
        });

        var blurTimeout = false;
        var searchTimeout = false;

        var doSearchWithTimeout = function() {
            if (blurTimeout) clearTimeout(blurTimeout);
            if (searchTimeout) clearTimeout(searchTimeout);

            if (that.isSelectedItem || that.getComponent().getValue() == '') return;

            searchTimeout = setTimeout(function() {
                var uriString = that.config.config.proxy.url + (that.config.config.proxy.url.indexOf('?') ? '&' : '?') + encodeURIComponent(that.config.config.needleKey) + '=' + encodeURIComponent(that.getValue(true));
                that.resultsStore.getProxy().setUrl(uriString);
                that.isSelectedItem = false;
                that.resultsStore.load();
                that.resultsList.setHeight(that.config.config.resultsHeight);
            }, 300);
        };

        this.resultsList.on('itemtouchend', function() {
            if (blurTimeout) clearTimeout(blurTimeout);
        });

        this.resultsList.onScroll = function() {};

        this.resultsList.on('itemtap', function(self, index, target, record) {
            that.setValue(record.get('name'), record.get('id'));
            that.isSelectedItem = true;

            blurTimeout = setTimeout(function() {
                that.resultsList.setHeight(0);
            }, 500);
        });

        this.getComponent().on('focus', doSearchWithTimeout);
        this.getComponent().on('keyup', function() {
            that.isSelectedItem = false;
            doSearchWithTimeout();
        });

        this.getComponent().on('blur', function(event) {
            if (searchTimeout) clearTimeout(searchTimeout);

            blurTimeout = setTimeout(function() {
                that.resultsList.setHeight(0);
            }, 500);
        });

    }

});

Ext.application({
    name: 'AronaRunners',

    requires: [
        'Ext.MessageBox'
    ],

    models: [
        'Athletes',
        'FootRaces',
        'ChartRaces'
    ],

    stores: [
        'Athletes',
        'Athlete',
        'FootRaces',
        'ChartRaces'
    ],

    controllers: [
        'Athletes',
        'FootRaces'
    ],

    views: [
        'Main',
        'Athlete',
        'Athletes',
        'FootRaces',
        'FootRace',
        'Charts',
        'ChartRace'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('AronaRunners.view.Main'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
