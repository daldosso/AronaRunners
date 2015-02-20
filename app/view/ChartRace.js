Ext.define('AronaRunners.view.ChartRace', {
    extend: 'Ext.form.Panel',
    xtype: 'chartRace',
    requires: [
        'Ext.field.Hidden'
    ],
    config: {
        id: 'chartRace',
        title: 'Gara',
        url: 'http://www.podisticaarona.it/mobile/svr/chartrace-add.php',
        layout: {
            type: 'vbox'
        },
        defaults: {},
        items: [{
            xtype: 'hiddenfield',
            id: 'raceId',
            name: 'raceId'
        }, {
            xtype: 'label',
            html: 'Il tuo nome',
            margin: '50 50 10 50'
        }, {
            xtype: 'autocompletefield',
            name: 'athleteId',
            value: '',
            margin: '0 50 10 50',
            width: 200,
            config: {
                proxy: {
                    type: 'ajax',
                    url: 'http://www.podisticaarona.it/mobile/svr/atleti-list.php?dummy',
                    reader: {
                        type: 'json'
                    }
                },
                resultsHeight: 300,
                needleKey: 'id',
                labelKey: 'name'
            }
        }, {
            xtype: 'button',
            text: 'Conferma',
            margin: 50,
            ui: 'confirm',
            action: 'save'
        }]
    }
});