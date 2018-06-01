const fsp    = require('fsp-eagle');
const jsdoc2md = require('jsdoc-to-markdown');

void async function build() {
	try {
		const markDown = await jsdoc2md.render({ files: 'zipper.js' });
		await fsp.writeFile(`${__dirname}/../api-doc.md`, markDown);
	} catch (e) {
		console.error('Error in build doc ', e);
	} finally {
		process.exit();
	}
}();


