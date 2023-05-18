// WORK AROUND for issue with LWC extending and legacy Lightning Locker (not LWS)
// https://github.com/salesforce/lwc/issues/3235 
import { api, LightningElement } from 'lwc';

export default class EventPasser extends LightningElement {

	@api 
	passEvent(event) {
		this.dispatchEvent(event);
	}
}