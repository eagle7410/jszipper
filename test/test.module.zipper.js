// Libs
const assert = require('assert');
const Zipper = require('../zipper');
const fsp    = require('fsp-eagle');

// Init
const PATH_RUNTIME              = `${__dirname}/runtime`;
const PATH_RUNTIME_SETTINGS     = `${PATH_RUNTIME}/settings`;
const PATH_RUNTIME_SETTINGS_ZIP = `${PATH_RUNTIME}/settings.zip`;
let zip;

describe('Testing module zipper', function() {

	before(async () => {
		await fsp.mustdir(PATH_RUNTIME);
		await fsp.mvdir(PATH_RUNTIME_SETTINGS);
		await fsp.mvfile(PATH_RUNTIME_SETTINGS_ZIP);
	});

	it('test unpack', async () => {
		zip = new Zipper();

		await zip.unpack(`${__dirname}/data/settings.zip`, PATH_RUNTIME);

		assert.equal(await fsp.exists(PATH_RUNTIME_SETTINGS), true);
	});

	it('test pack', async () => {
		zip = new Zipper();

		await zip.pack(PATH_RUNTIME_SETTINGS, PATH_RUNTIME_SETTINGS_ZIP);

		assert.equal(await fsp.exists(PATH_RUNTIME_SETTINGS_ZIP), true);
	});
});
