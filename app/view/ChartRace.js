Ext.define('AronaRunners.view.ChartRace', {
    extend: 'Ext.form.Panel',
    xtype: 'chartRace',
    requires: [
        'Ext.field.Hidden'
    ],
    config: {
        title: 'Gara',
        url: 'http://www.podisticaarona.it/mobile/svr/footrace-add.php',
        layout: {
            type: 'hbox'
        },
        defaults: {
            margin: 50
        },
        items: [{
            xtype: 'hiddenfield',
            name: 'id'
        }, {
            xtype: 'label',
            html: 'Il tuo nome'
        }, {
            xtype: 'autocompletefield',
            value: '',
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
        }]
    }
});