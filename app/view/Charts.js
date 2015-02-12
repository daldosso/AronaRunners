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
                store: 'FootRaces',
                itemTpl: [
                    '<table style=""><tr><td style="text-align: right; padding-right: 10px">',
                    'Dove: </td><td>{where}</td></tr><tr><td style="text-align: right; padding-right: 10px">',
                    'Quando: </td><td>{when}</td></tr><tr><td style="text-align: right; padding-right: 10px">',
                    'Km: </td><td>{length} <tpl if="length2 !== 0">e {length2}</tpl> <tpl if="length3 !== 0">e {length3}</tpl></td></tr><tr><td style="text-align: right; padding-right: 10px">',
                    'Podistici: </td><td>{participants}</td>',
                    '</tr></table>'
                ]
            }
        ]
    }
});