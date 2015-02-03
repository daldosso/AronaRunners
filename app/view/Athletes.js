Ext.define('AronaRunners.view.Athletes', {
    extend: 'Ext.NavigationView',
    xtype: 'athletesList',
    requires: [
        'Ext.dataview.List',
        'Ext.data.Store',
        'Ext.field.Search'
    ],
    config: {
        title: 'Atleti',
        iconCls: 'team',
        layout: {
            type: 'card'
        },
        navigationBar: {
            items: [{
                xtype: 'searchfield',
                label: 'Cerca',
                name: 'filter',
                listeners: {
                    keyup: function(me) {
                        var athletes = Ext.data.StoreManager.lookup('Athletes');
                        athletes.clearFilter();
                        athletes.filterBy(function(record, id) {
                            var match = me.getValue().toUpperCase();
                            var lastName = record.get('lastname');
                            lastName = lastName ? lastName.toUpperCase() : '';
                            var firstName = record.get('firstname')
                            firstName = firstName ? firstName.toUpperCase() : '';
                            return (lastName.indexOf(match) !== -1) || (firstName.indexOf(match) !== -1);
                        });
                    }
                }
            }]
        },
        items: [{
                xtype: 'list',
                id: 'athletesList',
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