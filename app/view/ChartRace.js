Ext.define('AronaRunners.view.ChartRace', {
    extend: 'Ext.form.Panel',
    xtype: 'chartRace',
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
        },{
            xtype: 'autocompletefield',
            label: 'Person',
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