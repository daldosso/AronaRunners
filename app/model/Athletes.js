Ext.define('AronaRunners.model.Athletes', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
			{ name: 'id', type: 'int' },
            { name: 'lastname', type: 'string' },
            { name: 'firstname', type: 'string' },
            { name: 'photo', type: 'string' }
        ]
    }
});
