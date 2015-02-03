Ext.define("AronaRunners.store.Athlete", {
    extend: 'Ext.data.Store',
    alias: 'store.Athlete',
    config: {
        proxy: {
            type: 'ajax',
            url: 'http://www.podisticaarona.it/mobile/svr/atleta.php',
            reader: {
                type: 'json'
            }
        },
        model: 'AronaRunners.model.Athletes'
    }
});
