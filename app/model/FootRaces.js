Ext.define('AronaRunners.model.FootRaces', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'when', type: 'string' },
            { name: 'day', type: 'string' },
            { name: 'hour', type: 'string' },
            { name: 'where', type: 'string' },
            { name: 'length', type: 'float' },
            { name: 'length2', type: 'float' },
            { name: 'length3', type: 'float' },
            { name: 'participants', type: 'int' },
            { name: 'organizer', type: 'string' },
            { name: 'web', type: 'string' }
        ]
    }
});
