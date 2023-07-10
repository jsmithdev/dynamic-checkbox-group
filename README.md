# Dynamic Checkbox Group

An LWC checkbox group, based on Salesforce's [lightning-checkbox-group](https://developer.salesforce.com/docs/component-library/bundle/lightning-checkbox-group/specification), that:

- Adds ability to set the options dynamically based on the object, field, and record type.
- Adds horizontal and vertical alignment (default: horizontal)

<img src="https://i.imgur.com/CJIs5Sb.png" width="350px;">

## Attributes

| Name | Type | Description |
| --- | --- | --- |
| `label` | `String` | The label of the picklist |
| `vertical` | `Boolean` | Adding the attribute makes checkboxes align vertically |
| `value` | `String` | The value of the selected option (*needs tested) |
| `recordTypeId` | `String` | The RecordType.Id to use in options import |
| `fieldApiName` | `String` | The Field to use in options import |
| `objectApiName` | `String` | The sObject to use in options import |
| `options-override` | `Array` | Set list of label, value options (instead of dynamically) |
| `variant` | `String` | label-hidden, label-inline, label-stacked |

## Usage

```html
<c-dynamic-checkbox-group
    name="StageName"
    
    label="StageName"

    object-api-name="Opportunity"
    field-api-name="StageName"
    record-type-id={recordTypeId}

    onchange={handleChange}
></c-dynamic-checkbox-group>
```

See the [demo](/force-app/main/default/lwc/dcgDemo/) for more details (demo works well in SFDX Local Development Server 👍)

### RecordType Id

As seen above, this takes a record-type-id. 

However, we can easily get a record type id in a parent component to give to this without Apex: 

```js
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import Opportunity from '@salesforce/schema/Opportunity'; 

export default class ParentExample extends LightningElement {
	
    recordTypeId;

    @wire (getObjectInfo, { objectApiName: Opportunity })
    _setField({ data, error }) {
        this.recordTypeId = data?.defaultRecordTypeId;
    }
}
```

This way it's more effecient on projects that use multiple checkbox-groups, etc by making that call only once

## Deploy

```bash
sfdx force:source:deploy -p force-app/main/default/lwc/dynamicCheckboxGroup
```

📌  Above deploys to the default org set; Add `-u user@domain.com` or `-u alias` to deploy else where

___

Coded with ❤️ by [Jamie Smith](https://jsmith.dev)
