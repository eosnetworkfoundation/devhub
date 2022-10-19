const nodeCrypto = typeof window === 'undefined' ? require('crypto') : null;

const getRandomNumber = () => {
	const nodeJsEnv = () => parseInt(nodeCrypto.randomBytes(8).toString('hex'), 16) / 0xffffffffffffffff;

	const browserEnv = () => {
		const arr = new Uint32Array(1);
		window.crypto.getRandomValues(arr);
		return arr[0] / (0xffffffff + 1);
	};

	return nodeCrypto ? nodeJsEnv() : browserEnv();
};

export default class IdGenerator {
	static rand() {
		return getRandomNumber();
	}

	static text(size) {
		let text = "";
		const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for (let i = 0; i < size; i++) text += possible.charAt(Math.floor(IdGenerator.rand() * possible.length));
		return text;
	}

}
