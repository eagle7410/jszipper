<a name="Zipper"></a>

## Zipper
**Kind**: global class  

* [Zipper](#Zipper)
    * [.unpack(zipFilePath, targetDir)](#Zipper+unpack) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.pack(pathSource, pathZip)](#Zipper+pack) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.addFile(pathFile, base)](#Zipper+addFile) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.addDir(pathDir, base)](#Zipper+addDir) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="Zipper+unpack"></a>

### zipper.unpack(zipFilePath, targetDir) ⇒ <code>Promise.&lt;boolean&gt;</code>
Unzip archive.

**Kind**: instance method of [<code>Zipper</code>](#Zipper)  

| Param | Type |
| --- | --- |
| zipFilePath | <code>string</code> | 
| targetDir | <code>string</code> | 

<a name="Zipper+pack"></a>

### zipper.pack(pathSource, pathZip) ⇒ <code>Promise.&lt;void&gt;</code>
Archived dir or file

**Kind**: instance method of [<code>Zipper</code>](#Zipper)  

| Param | Type |
| --- | --- |
| pathSource | <code>string</code> | 
| pathZip | <code>string</code> | 

<a name="Zipper+addFile"></a>

### zipper.addFile(pathFile, base) ⇒ <code>Promise.&lt;void&gt;</code>
Add file to archive.

**Kind**: instance method of [<code>Zipper</code>](#Zipper)  

| Param | Type | Description |
| --- | --- | --- |
| pathFile | <code>string</code> |  |
| base | <code>string</code> | Dir in archive. ''  is root |

<a name="Zipper+addDir"></a>

### zipper.addDir(pathDir, base) ⇒ <code>Promise.&lt;void&gt;</code>
Add file to archive.

**Kind**: instance method of [<code>Zipper</code>](#Zipper)  

| Param | Type | Description |
| --- | --- | --- |
| pathDir | <code>string</code> |  |
| base | <code>string</code> | base Dir in archive. ''  is root |

