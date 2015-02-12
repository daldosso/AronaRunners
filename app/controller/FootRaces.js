Ext.override(Ext.MessageBox, {
    hide:  function() {
        if (this.activeAnimation && this.activeAnimation._onEnd) {
            this.activeAnimation._onEnd();
        }
        return this.callParent(arguments);
    }
});

Ext.define('AronaRunners.controller.FootRaces', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            footRacesList: '#footRacesList',
            confirm: 'button[action=confirm]',
            decline: 'button[action=decline]',
            maybe: 'button[action=maybe]'
        },
        control: {
            footRacesList: {
                itemtap: 'onFootRaceItemTap'
            },
            confirm: {
                tap: function() {
                    var container = this.getFootRacesList().up('footRacesList');
                    var form = this.getConfirm().up('formpanel');
                    form.submit({
                        success: function() {
                            Ext.data.StoreManager.lookup('FootRaces').load();
                            Ext.Msg.confirm("", "Grande!!! ci vediamo alla gara.<br/>Vuoi inserire il tuo nome per entrare in classifica?", function (button) {
                                if (button == 'yes') {
                                    var chartRace = Ext.widget('chartRace');
                                    chartRace.setTitle('Gara a ...');
                                    container.push(chartRace);
                                }
                            });
                        },
                        failure: function(f, r) {
                            Ext.Msg.alert('Errore', r.message);
                        }
                    });
                }
            },
            decline: {
                tap: function() {
                    Ext.Msg.alert('', 'Ok, sar&agrave; per la prossima');
                }
            },
            maybe: {
                tap: function() {
                    Ext.Msg.alert('', 'Ok, magari ci vediamo');
                }
            }
        }
    },
    onFootRaceItemTap: function(me, i, t, r) {
        var container = this.getFootRacesList().up('footRacesList');
        var id = r.get('id');
        var raceView = Ext.widget('footRace');
        raceView.setTitle('Gara a ' + r.get('where'));
        raceView.setRecord(r);
        container.push(raceView);
    }
});
