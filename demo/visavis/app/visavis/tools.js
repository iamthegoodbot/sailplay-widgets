function intval(mixValue) {
	if (isNaN(mixValue)) {
		return 0;
	}
	return  parseInt(parseFloat(mixValue));
}

function p() {
	try {
		if (intval(arguments.length) > 1) {
			console.log(arguments);
		} else if (!intval(arguments.length)) {
			console.log('arguments empty');
		} else {
			console.log(arguments[0]);
		}
	} 
	catch(e) {}
}

function in_array(val, ar) {
	var bIn;
	try {
		bIn = $.inArray(val, ar) !== -1;
	}
	catch(e) {
		throw new Error("jQuery not defined??")
	}
	return bIn;
}