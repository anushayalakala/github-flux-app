import BaseStore from './BaseStore';
import dispatcher from '../dispatcher';

class NavStore extends BaseStore {

    constructor() {
        super();
        this.selectedTabIndex = localStorage.getItem('TAB_INDEX');
    }

    setSelectedTabIndex(value) {
        this.selectedTabIndex = value;
        this.emitChange()
    }

    getSelectedTabIndex() {
        return this.selectedTabIndex;
    }
    
    handelActions(action) {
        switch (action.type) {
            case "SET_SELECTED_INDEX": {
                this.setSelectedTabIndex(action.index); 
                break;
            }
            default:
                return true;
        }
    }
}

const navStore = new NavStore;
dispatcher.register(navStore.handelActions.bind(navStore));
export default navStore;

