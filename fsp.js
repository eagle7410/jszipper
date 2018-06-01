const fs          = require('fs');
const path        = require('path');
const {promisify} = require('util');

/**
 *
 * @type {{
 * constants : object,
 * Stats : Promise<*>,
 * F_OK : number,
 * R_OK : number,
 * W_OK : number,
 * X_OK : number,
 * access : Promise<*>,
 * accessSync : function,
 * exists : Promise<*>,
 * existsSync : function,
 * readFile : Promise<*>,
 * readFileSync : function,
 * close : Promise<*>,
 * closeSync : function,
 * open : Promise<*>,
 * openSync : function,
 * read : Promise<*>,
 * readSync : function,
 * write : Promise<*>,
 * writeSync : function,
 * rename : Promise<*>,
 * renameSync : function,
 * truncate : Promise<*>,
 * truncateSync : function,
 * ftruncate : Promise<*>,
 * ftruncateSync : function,
 * rmdir : Promise<*>,
 * rmdirSync : function,
 * fdatasync : Promise<*>,
 * fdatasyncSync : function,
 * fsync : Promise<*>,
 * fsyncSync : function,
 * mkdir : Promise<*>,
 * mkdirSync : function,
 * readdir : Promise<*>,
 * readdirSync : function,
 * fstat : Promise<*>,
 * lstat : Promise<*>,
 * stat : Promise<*>,
 * fstatSync : function,
 * lstatSync : function,
 * statSync : function,
 * readlink : Promise<*>,
 * readlinkSync : function,
 * symlink : Promise<*>,
 * symlinkSync : function,
 * link : Promise<*>,
 * linkSync : function,
 * unlink : Promise<*>,
 * unlinkSync : function,
 * fchmod : Promise<*>,
 * fchmodSync : function,
 * chmod : Promise<*>,
 * chmodSync : function,
 * fchown : Promise<*>,
 * fchownSync : function,
 * chown : Promise<*>,
 * chownSync : function,
 * _toUnixTimestamp : Promise<*>,
 * utimes : Promise<*>,
 * utimesSync : function,
 * futimes : Promise<*>,
 * futimesSync : function,
 * writeFile : Promise<*>,
 * writeFileSync : function,
 * appendFile : Promise<*>,
 * appendFileSync : function,
 * watch : Promise<*>,
 * watchFile : Promise<*>,
 * unwatchFile : Promise<*>,
 * realpathSync : function,
 * realpath : Promise<*>,
 * mkdtemp : Promise<*>,
 * mkdtempSync : function,
 * copyFile : Promise<*>,
 * copyFileSync : function,
 * createReadStream : Promise<*>,
 * ReadStream : Promise<*>,
 * FileReadStream : Promise<*>,
 * createWriteStream : Promise<*>,
 * WriteStream : Promise<*>,
 * FileWriteStream : Promise<*>
 * }}
 */
const fileSystemPromises = {};

for (let prop of Object.keys(fs)) {

	if (prop.includes('Sync') || prop.includes('Stream')) {
		fileSystemPromises[prop] = fs[prop];
		continue;
	}

	if (typeof fs[prop]  === 'function') {
		fileSystemPromises[prop] = promisify(fs[prop]);
	} else {
		fileSystemPromises[prop] = fs[prop];
	}
}

/**
 * Crete path if not exists.
 *
 * @param {string} dirPath
 *
 * @return {Promise<void>}
 */
fileSystemPromises.mustdir = async function(dirPath) {

	if (await this.exists(dirPath))
		return true;

	let dirCurrent = '';

	for (let dir of dirPath.split(path.sep).filter(dir => dir !== '')) {
		dirCurrent += path.sep + dir;

		if (await this.exists(dirCurrent)) continue;

		await this.mkdir(dirCurrent);

	}

	return true;
};

/**
 * Remove directory. If directory not empty remove content and folder
 *
 * @param {boolean} dirPath
 *
 * @return {Promise<boolean>}
 */
fileSystemPromises.mvdir = async function(dirPath) {
	if (!await this.exists(dirPath)) return true;

	if (!(await this.stat(dirPath)).isDirectory())
		throw new Error(`Path ${dirPath} not directory`);

	let currPath = '';
	let stat;
	for (let fileName of await this.readdir(dirPath)) {

		currPath = dirPath + path.sep + fileName;
		stat = await this.stat(currPath);

		if (stat.isDirectory()) {
			await this.mvdir(currPath);
		} else {
			await this.unlink(currPath);
		}
	}

	await this.rmdir(dirPath);

	return true;
};

/**
 * Remove file. If file not exists return true.
 *
 * @param {string} dirFile
 *
 * @return {Promise<boolean>}
 */
fileSystemPromises.mvfile = async function(dirFile) {
	if (!await this.exists(dirFile)) return true;

	if (!(await this.stat(dirFile)).isFile())
		throw new Error(`Path ${dirFile} not file`);

	await this.unlink(dirFile);

	return true;
};

module.exports = fileSystemPromises;
