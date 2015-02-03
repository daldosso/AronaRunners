Ext.define("AronaRunners.store.Athletes", {
    extend: 'Ext.data.Store',
    alias: 'store.Athletes',
    config: {
        autoLoad: true,
        sorters: 'lastname',
        grouper: {
            groupFn: function(record) {
                return (record && record.get('lastname') ? record.get('lastname')[0] : 'z');
            }
        },
        proxy: {
            type: 'ajax',
            url: 'http://www.podisticaarona.it/mobile/svr/atleti-list.php',
            reader: {
                type: 'json'
            }
        },
        model: 'AronaRunners.model.Athletes'
    }
});
