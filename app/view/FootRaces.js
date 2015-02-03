Ext.define('AronaRunners.view.FootRaces', {
    extend: 'Ext.NavigationView',
    xtype: 'footRacesList',
    requires: [
        'Ext.dataview.List',
        'Ext.data.Store',
        'Ext.field.Search'
    ],
    config: {
        title: 'Gare',
        iconCls: 'locate',
        layout: {
            type: 'card'
        },
        items: [{
                xtype: 'list',
                title: 'Gare',
                flex: 1,
                store: 'Athletes',
                grouped: true,
                itemTpl: [
                    '<table style=""><tr><td style="text-align: right; padding-right: 10px">',
                    'Cognome: </td><td>{lastname}</td></tr><tr><td style="text-align: right; padding-right: 10px">',
                    'Nome: </td><td>{firstname}</td></tr></table>'
                ]
            }
        ]
    }
});