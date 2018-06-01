# jszipper
wrapper for https://stuk.github.io/jszip/

<a name="fileSystemPromises"></a>

## fileSystemPromises : <code>Object</code>
**Kind**: global constant

* [fileSystemPromises](#fileSystemPromises) : <code>Object</code>
    * [.mustdir(dirPath)](#fileSystemPromises.mustdir) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.mvdir(dirPath)](#fileSystemPromises.mvdir) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.mvfile(dirFile)](#fileSystemPromises.mvfile) ⇒ <code>Promise.&lt;boolean&gt;</code>

<a name="fileSystemPromises.mustdir"></a>

### fileSystemPromises.mustdir(dirPath) ⇒ <code>Promise.&lt;void&gt;</code>
Crete path if not exists.

**Kind**: static method of [<code>fileSystemPromises</code>](#fileSystemPromises)

| Param | Type |
| --- | --- |
| dirPath | <code>string</code> |

<a name="fileSystemPromises.mvdir"></a>

### fileSystemPromises.mvdir(dirPath) ⇒ <code>Promise.&lt;boolean&gt;</code>
Remove directory. If directory not empty remove content and folder

**Kind**: static method of [<code>fileSystemPromises</code>](#fileSystemPromises)

| Param | Type |
| --- | --- |
| dirPath | <code>boolean</code> |

<a name="fileSystemPromises.mvfile"></a>

### fileSystemPromises.mvfile(dirFile) ⇒ <code>Promise.&lt;boolean&gt;</code>
Remove file. If file not exists return true.

**Kind**: static method of [<code>fileSystemPromises</code>](#fileSystemPromises)

| Param | Type |
| --- | --- |
| dirFile | <code>string</code> |
