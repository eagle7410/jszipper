# jszipper
wrapper for [jszip](https://stuk.github.io/jszip/)

## Install
```bash
npm i jszipper --save
```

Example use from test

```node
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

```
xz## Version
1.0.1 - base.

## Extends
[api description](https://github.com/eagle7410/fsp-eagle/blob/master/api-doc.md)

## People
Developer [Igor Stcherbina](https://github.com/eagle7410)

## License

MIT License

Copyright (c) 2018 [Igor Stcherbina](https://github.com/eagle7410)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

