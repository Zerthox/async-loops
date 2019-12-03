function asyncWhile(condition, body) {
	return new Promise((resolve) => {
		const loop = async () => {
			if (await condition()) {
				await body();
				setTimeout(loop, 0);
			}
			else {
				resolve();
			}
		};
		setTimeout(loop, 0);
	});
}

function asyncFor(initial, condition, increment, body) {
	return new Promise(async (resolve) => {
		let i = initial instanceof Function ? await initial() : initial;
		const loop = async () => {
			if (await condition(i)) {
				await body(i);
				i = await increment(i);
				setTimeout(loop, 0);
			}
			else {
				resolve();
			}
		};
		setTimeout(loop, 0);
	});
}

function asyncEach(object, body) {
	return new Promise((resolve) => {
		let i = 0;
		const keys = Object.keys(object);
		const loop = async () => {
			if (i < keys.length) {
				await body(keys[i], object[keys[i]], i, object);
				i++;
				setTimeout(loop, 0);
			}
			else {
				resolve();
			}
		};
		setTimeout(loop, 0);
	});
}

module.exports = {
	asyncWhile,
	asyncFor,
	asyncEach
};