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
            confirm: 'button[action=confirm]'
        },
        control: {
            footRacesList: {
                itemtap: 'onFootRaceItemTap'
            },
            confirm: {
                tap: function() {
                    var form = this.getConfirm().up('formpanel');
                    form.submit({
                        success: function() {
                            Ext.Msg.alert('Fatto', 'Registrato, grazie');
                            Ext.data.StoreManager.lookup('FootRaces').load();
                        },
                        failure: function(f, r) {
                            Ext.Msg.alert('Errore', r.message);
                        }
                    });
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
