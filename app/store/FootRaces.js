Ext.define("AronaRunners.store.FootRaces", {
    extend: 'Ext.data.Store',
    alias: 'store.FootRaces',
    config: {
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'http://www.podisticaarona.it/mobile/svr/footraces-list.php',
            reader: {
                type: 'json'
            }
        },
        model: 'AronaRunners.model.FootRaces'
    }
});
