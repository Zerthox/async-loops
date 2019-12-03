# async-loops
Asynchronous, non-blocking versions of loops.

## Usage
```js
let i = 0;
asyncWhile(async () => i < 10, async () => {
	console.log("While at", i);
	i++;
});

asyncFor(async () => 0, async (i) => i < 10, async (i) => ++i,
	async (i) => {
		console.log("For at", i);
	}
);

const data = {
	a: 1,
	b: 2,
	c: 3
};
asyncEach(data, async (key, value, index, object) => {
	console.log("Each at", key, value, index, object);
});
```

The passed functions of course do not have to be asynchronous.

You can pass the initial value to `asyncFor` directly instead of wrapping it in a function:
```js
asyncFor(0, (i) => i < 10, (i) => ++i, (i) => {
	console.log("For at", i);
});
```

Be careful with the increment function in `asyncFor`: Writing `(i) => i++` will result in an infinite loop since it does not return the incremented value.