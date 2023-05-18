
export function setPicklistValues(data){
		
	return data?.values 
		? data.values.map(({value, label}) => {
			return {
				selected: false,
				value,
				label,//: label.includes('&') ? decodeHtml(label) : label,
			}
		})
		: [];
}

function decodeHtml(html) {
	const txt = document.createElement("textarea");
	txt.innerHTML = html;
	return txt.value;
}