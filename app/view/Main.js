Ext.define('AronaRunners.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'AronaRunners.view.Athletes'
    ],
    config: {
        tabBarPosition: 'bottom',
        items: [{
                title: 'Home',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Podistica Arona'
                },
                html: "<div style='text-align: center'><img src='http://www.podisticaarona.it/templates/2014Podistica/images/logo_top.png' style='width: 230px' /></div>"
            }, {
                xclass: 'AronaRunners.view.Athletes'
            }
        ]
    }
});
