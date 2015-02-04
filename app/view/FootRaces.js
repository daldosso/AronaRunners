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
                id: 'footRacesList',
                title: 'Gare',
                flex: 1,
                store: 'FootRaces',
                itemTpl: [
                    '<table style=""><tr><td style="text-align: right; padding-right: 10px">',
                    'Dove: </td><td>{where}</td></tr><tr><td style="text-align: right; padding-right: 10px">',
                    'Quando: </td><td>{when}</td></tr><tr><td style="text-align: right; padding-right: 10px">',
                    'Km: </td><td>{length}</td></tr><tr><td style="text-align: right; padding-right: 10px">',
                    'Partecipanti: </td><td>{participants}</td>',
                    '</tr></table>'
                ]
            }
        ]
    }
});