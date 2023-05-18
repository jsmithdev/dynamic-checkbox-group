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

See the [demo](/force-app/main/default/lwc/dynamicCheckboxGroupDemo/) for more details (demo works well in SFDX Local Development Server 👍)

## Deploy

```bash
sfdx force:source:deploy -p force-app/main/default/lwc/dynamicCheckboxGroup
```

📌  Above deploys to the default org set; Add `-u user@domain.com` or `-u alias` to deploy else where

___

Coded with ❤️ by [Jamie Smith](https://jsmith.dev)