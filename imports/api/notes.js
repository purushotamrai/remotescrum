import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Notes = new Mongo.Collection("Notes");

Meteor.methods({
    'notes.insert'(categoryId, retroId, text, username) {
        check(categoryId, String);
        check(retroId, String);
        check(username, String);
        check(text, String);
        Notes.insert({
            text,
            createdAt: new Date(),
            categoryId,
            retroId,
            owner: username,
            "votes" : 1,
            "voted" : true
        });
    },
    'notes.vote'(note) {
        check(note, Object);
        if(!note.voted){
            note.votes++;
            note.voted = true;
        } else {
            note.votes--;
            note.voted = false;
        }
        Notes.update({ '_id': note._id }, note);
    },
    'notes.remove'(note) {
        check(note, Object);
        Notes.remove(note._id);
    },
    'notes.update'(note, newText) {
        check(note, Object);
        check(newText, String);
        note.text = newText;
        Notes.update({ '_id': note._id }, note);
    }
});
