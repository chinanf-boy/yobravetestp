'use babel';

import YobravetestpView from './yobravetestp-view';
import { CompositeDisposable } from 'atom';

export default {

  yobravetestpView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.yobravetestpView = new YobravetestpView(state.yobravetestpViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.yobravetestpView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'yobravetestp:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.yobravetestpView.destroy();
  },

  serialize() {
    return {
      yobravetestpViewState: this.yobravetestpView.serialize()
    };
  },

  toggle() {
    var editor, words;
     if (this.modalPanel.isVisible()) {
       return this.modalPanel.hide();
     } else {
       editor = atom.workspace.getActiveTextEditor();
       words = editor.getText().split(/\s+/).length;
       this.yobravetestpView.setCount(words);
       return this.modalPanel.show();
     }
  }

};
