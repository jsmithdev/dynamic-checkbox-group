import { wire, api } from 'lwc';
import LightningCheckboxGroup from 'lightning/checkboxGroup'
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { setPicklistValues } from './util';

export default class DynamicCheckboxGroup extends LightningCheckboxGroup {

	selected = [];
	options = [];
	@api single;
	@api vertical;
	@api label = '';
	@api numberOfGroups = 9;

	@api recordTypeId;
	@api fieldApiName;
	@api objectApiName;
	@api debugMode;
	@api 
	get optionsOverride() {
		return this.options || [];
	}
	set optionsOverride(value) {
		if(!value || !value.length) return;
		//this.options = setPicklistValues({ values: value.map(v => ({ value: v, label: v })) });;
		this.options = value;
	}
	
	@wire(getPicklistValues, { recordTypeId: '$recordTypeId', fieldApiName: '$fieldApi' })
    _setField({ data, error }) {
		if(data) this.options = setPicklistValues(data);
	}

	get showLabel() {
		return this.label && this.variant !== 'label-hidden';
	}
	get fieldApi() {
		return {
			fieldApiName: this.fieldApiName,
			objectApiName: this.objectApiName,
		}
	}
	get contentClasses() {
		if(this.vertical) return 'slds-form-element__control ver-elm';
		return 'slds-form-element__control hor-elm';
	}
	get containerClasses() {
		if(this.vertical) return 'container';
		return 'container lineHeightTwo';
	}
	get value() {
		return this.selected
	}
	set value(value) {
		
		// if no value or already has, nothing to do
		if(!value || this.selected.includes(value)) return;

		// setup array of values to add
		const values = Array.isArray(value)
			? value
			: [value];
		
		// add values to selected
		this.selected = [
			...this.selected.filter(item => !values.includes(item)),
			...values,
		];
	}

	get groups() {
		return this.values.reduce((groups, option, index) => {
			const groupIndex = Math.floor(index / this.numberOfGroups);
			if(!groups[groupIndex]) groups[groupIndex] = {
				options: [],
				key: `group-${groupIndex}`,
			};
			const selected = this.selected.includes(option.value);
			groups[groupIndex].options.push({
				...option,
				selected,
			});
			return groups;
		}, []);
	}

	get values() {
		let singled = false;
		return this.options.map(option => {
			const selected = this.selected.includes(option.value);
			
			const opt = {
				label: option.label,
				value: option.value,
			}
			if(!this.single) {
				opt.selected = selected;
			}
			else if(this.single && selected && !singled) {
				singled = true;
				opt.selected = true;
			}
			else {
				opt.selected = false;
			}
			return opt;
		});
	}

	async handleClick(event) {
		event.cancelBubble = true;
		event.stopPropagation();

		const { value } = event.currentTarget.dataset;
		
		const detail = {
			name: this.name,
		}

		if(this.single) {
			this.selected = [value];
			detail.values = value;
		}
		else {
			this.selected = this.selected.includes(value)
				? this.selected.filter(item => item !== value)
				: [...this.selected, value];
			detail.value = value;
		}

		// options
		this.options = this.options.map(option => {
			const selected = this.selected.includes(option.value);
			return {
				...option,
				selected,
			}
		});


		console.log(`hazloc Group click:`)
		console.log(JSON.parse(JSON.stringify({
			value,
			selected: this.value,
		})));
	
		// https://github.com/salesforce/lwc/issues/3235
		const passer = this.template.querySelector('c-event-passer');
		passer.passEvent(new CustomEvent('change', {
			bubbles: true,
			composed: true,
			detail,
		}));
	}
	debug() {
		console.log(`hazloc HOR DEBUG:`)
		const recordTypeId = this.recordTypeId
		console.log(JSON.parse(JSON.stringify({
			LOC: '$-HazlocQuoting HORIZONTAL '+this.fieldApiName,
			recordTypeId,
			objectApiName: this.objectApiName,
			fieldApiName: this.fieldApiName,
			fieldApi: this.fieldApi,
			recordTypeId: this.recordTypeId,
			fieldApiName: this.fieldApiName,
			objectApiName: this.objectApiName,
		})));
	}

}


	/*  */

	/* get fieldApi() {
		return {
			fieldApiName: this.fieldApiName,
			objectApiName: this.objectApiName,
		}
	}

	renderedCallback() {
		const recordTypeId = this.recordTypeId
		console.log(JSON.parse(JSON.stringify({
			LOC: '$-HazlocQuoting HORIZONTAL '+this.fieldApiName,
			recordTypeId,
			objectApiName: this.objectApiName,
			fieldApiName: this.fieldApiName,
			fieldApi: this.fieldApi,
		})));
	}

	@wire(getPicklistValues, { recordTypeId: '$recordTypeId', fieldApiName: '$fieldApi' })
    _setField({ data, error }) {
		if(!data || !error) return;
		console.log(JSON.parse(JSON.stringify({
			LOC: '$-Hazloc HORIZONTAL SET FIELD',
			error,
			data,
			name: this.name,
			recId: this.recId,
			fieldApiName: this.fieldApiName,
		})));
		if(data) this.options = setPicklistValues(data);
	} */

