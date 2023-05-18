import { LightningElement, wire } from 'lwc';

// used to get the record type id
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import Opportunity from '@salesforce/schema/Opportunity'; 

export default class DcgDemo extends LightningElement {

	recordTypeId;

    @wire (getObjectInfo, { objectApiName: Opportunity })
    _setField({ data, error }) {
		this.recordTypeId = data?.defaultRecordTypeId;
	}

	secondOptions = [
		{ label: 'Option 1', value: 'Option 1' },
		{ label: 'Option 2', value: 'Option 2' },
		{ label: 'Option 3', value: 'Option 3' },
		{ label: 'Option 4', value: 'Option 4' },
	];

	handleChange(event) {
		const { name } = event.target;
		const { value } = event.detail;
		console.log(`DCG Demo \n${name}: ${value}`);
	}
}