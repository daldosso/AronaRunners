Ext.define("AronaRunners.store.ChartRaces", {
    extend: 'Ext.data.Store',
    alias: 'store.ChartRaces',
    config: {
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'http://www.podisticaarona.it/mobile/svr/chartraces-list.php',
            reader: {
                type: 'json'
            }
        },
        model: 'AronaRunners.model.ChartRaces'
    }
});
