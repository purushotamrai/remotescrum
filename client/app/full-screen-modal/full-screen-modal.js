import { Retros } from '/imports/api/retros.js';

Template.fullScreenModal.onCreated( function() {
    var self = this;
    self.autorun(function() {
        let retroId = FlowRouter.getParam('_id');
        self.subscribe('currentRetro', retroId);
    });
});

Template.fullScreenModal.helpers({
    retro() {
        return Retros.findOne({});
    },
    shouldShowUsernamePrompt() {
        return !localStorage.getItem('username');
    }
});

Template.fullScreenModal.events({
    'submit .fullScreenModalForm': function(event, templateInstance) {
        event.preventDefault();
        let username = templateInstance.find(".usernameInput").value;
        if(username){
            localStorage.setItem('username', username);
            $('#fullScreenModal').removeClass('in');
            setTimeout(function(){
                 $('#fullScreenModal').removeClass('show');
            }, 150);
        }
    }
});
