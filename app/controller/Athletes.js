Ext.define('AronaRunners.controller.Athletes', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            athletesList: '#athletesList'
        },
        control: {
            athletesList: {
                itemtap: 'onAtheleItemTap'
            }
        }
    },
    onAtheleItemTap: function(me, i, t, r) {
        var container = this.getAthletesList().up('athletesList');
        var id = r.get('id');
        var athletes = Ext.data.StoreManager.lookup('Athletes');
        var athleteView = Ext.widget('athlete');
        var athleteRecord = athletes.getById(id);
        var athleteImage = athleteView.down('image');
        var imageBaseUrl = 'http://www.podisticaarona.it/podisticarona/';
        athleteImage.setSrc(imageBaseUrl + athleteRecord.get('photo'));
        athleteView.setRecord(athleteRecord);
        container.push(athleteView);
    }
});
