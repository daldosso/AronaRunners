Ext.define('AronaRunners.model.ChartRaces', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'athlete', type: 'string' },
            { name: 'km', type: 'float' },
            { name: 'races', type: 'int' }
        ]
    }
});
