Ext.define('AronaRunners.view.Charts', {
    extend: 'Ext.NavigationView',
    xtype: 'chartList',
    requires: [
        'Ext.dataview.List',
        'Ext.data.Store',
        'Ext.field.Search'
    ],
    config: {
        title: 'Classifica',
        iconCls: 'favorites',
        layout: {
            type: 'card'
        },
        items: [{
                xtype: 'list',
                id: 'chartList',
                title: 'Classifica',
                flex: 1,
                store: 'ChartRaces',
                itemTpl: [
                    '<table style=""><tr><td style="text-align: right; padding-right: 10px">',
                    'Atleta: </td><td>{athlete}</td></tr><tr><td style="text-align: right; padding-right: 10px">',
                    'Gare fatte: </td><td>{races}</td></tr><tr><td style="text-align: right; padding-right: 10px">',
                    'Km percorsi: </td><td>{km}</td>',
                    '</tr></table>'
                ]
            }
        ]
    }
});