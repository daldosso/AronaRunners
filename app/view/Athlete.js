Ext.define('AronaRunners.view.Athlete', {
    extend: 'Ext.form.Panel',
    xtype: 'athlete',
    requires: [
        'Ext.Img'
    ],
    config: {
        title: 'Atleta',
        layout: 'vbox',
        items: [ {
                name: 'lastname',
                xtype: 'textfield',
                label: 'Cognome',
                readOnly: true
            }, {
                name: 'firstname',
                xtype: 'textfield',
                label: 'Nome',
                readOnly: true
            }, {
                xtype: 'image',
                src: 'http://www.sencha.com/assets/images/sencha-avatar-64x64.png',
                flex: 1
        }]
    }
});