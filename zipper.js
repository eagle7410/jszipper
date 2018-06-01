// Libs
const fsp   = require('fsp-eagle');
const path  = require('path');
const JSZip = require('jszip');

// Init

const regExpSep = new RegExp(path.sep, 'g');

/**
 * @class Zipper
 */
class Zipper {
	constructor (...agr) {
		this.zip = new JSZip(...agr);
	}

	/**
	 * Unzip archive.
	 *
	 * @param {string} zipFilePath
	 * @param {string} targetDir
	 *
	 * @returns {Promise<boolean>}
	 */
	async unpack(zipFilePath, targetDir) {
		if (!await fsp.exists(zipFilePath))
			throw new Error(`Not found zip file ${zipFilePath}`);

		if (!await fsp.exists(targetDir))
			throw new Error(`Not found target dir ${targetDir}`);

		if (!(await await fsp.stat(targetDir)).isDirectory())
			throw new Error(`Target dir ${targetDir} is not directory`);

		const zipContent = await this.zip.loadAsync(await fsp.readFile(zipFilePath));

		targetDir += path.sep +  path.basename(zipFilePath, '.' + zipFilePath.split('.').pop());

		await fsp.mustdir(targetDir);

		let dirPath, fileName, fileContentArBuffer;

		for (let [filePath, data] of Object.entries(zipContent.files)) {
			if (data.dir) continue;

			dirPath  = path.dirname(filePath);
			fileName = path.basename(filePath);

			await fsp.mustdir(targetDir + path.sep + dirPath);

			fileContentArBuffer = await this.zip.file(filePath).async("arraybuffer");

			await fsp.writeFile(targetDir + path.sep + filePath, new Buffer(fileContentArBuffer));
		}

		return true;
	}

	/**
	 * Archived dir or file
	 *
	 * @param {string} pathSource
	 * @param {string} pathZip
	 *
	 * @returns {Promise<void>}
	 */
	async pack(pathSource, pathZip) {
		try {
			if ( (await fsp.stat(pathSource)).isDirectory() ) {
				await this.addDir(pathSource);
			} else {
				await this.addFile(pathSource);
			}

			let buffer = await this.zip.generateAsync({type : "uint8array"});

			await fsp.writeFile(pathZip, buffer);
		} catch (e) {
			console.error(e);
			throw e;
		}

	}

	/**
	 * Add file to archive.
	 *
	 * @param {string} pathFile
	 * @param {string} base Dir in archive. ''  is root
	 *
	 * @returns {Promise<void>}
	 */
	async addFile(pathFile, base = '') {
		if (!await fsp.exists(pathFile))
			throw new Error(`Not found file ${pathFile}`);

		if (!(await fsp.stat(pathFile)).isFile()) {
			throw new Error(`This not file ${pathFile}`);
		}

		const content = await fsp.readFile(pathFile);

		let pathZipArchive = path.join(base, path.basename(pathFile));

		this.zip.file(pathZipArchive.replace(regExpSep, '/'), content);
	}

	/**
	 * Add file to archive.
	 * @param {string} pathDir
	 * @param {string} base base Dir in archive. ''  is root
	 * @returns {Promise<void>}
	 */
	async addDir(pathDir, base = '') {

		let pathCurr;

		for (let fileName of  await fsp.readdir(pathDir)) {

			pathCurr = path.join(pathDir, fileName);

			if ( (await fsp.stat(pathCurr)).isDirectory() ) {
				await this.addDir(pathCurr, path.join(base, fileName));
				continue;
			}

			await this.addFile(pathCurr, base);
		}
	}
}

module.exports = Zipper;
