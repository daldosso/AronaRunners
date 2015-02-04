Ext.define('AronaRunners.view.FootRace', {
    extend: 'Ext.form.Panel',
    xtype: 'footRace',
    requires: [
        'Ext.field.Hidden'
    ],
    config: {
        title: 'Gara',
        url: 'http://www.podisticaarona.it/mobile/svr/footrace-add.php',
        defaults: {
            margin: 50,
            width: 200
        },
        items: [{
            xtype: 'hiddenfield',
            name: 'id'
        }, {
            html: '<div style="font-size: xx-large;">Parteciperai?</div>'
        }, {
            xtype: 'button',
            text: 'Si',
            ui: 'confirm',
            action: 'confirm'
        }, {
            xtype: 'button',
            text: 'No',
            ui: 'decline',
            action: 'decline'
        }, {
            xtype: 'button',
            text: 'Forse',
            ui: 'action',
            action: 'maybe'
        }]
    }
});