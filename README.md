# Advanced REST Client import-export UI module

[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/arc-ie.svg)](https://www.npmjs.com/package/@advanced-rest-client/arc-ie)

[![Build Status](https://travis-ci.com/advanced-rest-client/arc-ie.svg)](https://travis-ci.com/advanced-rest-client/arc-ie)

A module containing Advanced REST Client data export related UIs.

## Usage

### Installation

```sh
npm install --save @advanced-rest-client/arc-ie
```

### ImportDataInspectorElement

An element to visually inspect ARC export object. It is used by ARC during the import flow.

```html
<import-data-inspector .data="${data}" @cancel="${this.cancelled}" @import="${this.imported}"></import-data-inspector>
```

The data object is the `ArcExportObject` declare in the `@advanced-rest-client/arc-types/DataExport` declaration.

### ExportOptionsElement

An element to present the user with the file export options handled by the application.

```html
<export-options file="my-demo-file.arc" provider="drive" parentId="drive file id" withEncrypt></export-options>
```

The element dispatches event defined in `GoogleDriveEventTypes.listAppFolders` to request the application to list all application created folder in the Google Drive application.

### ArcExportFormElement

An element that contains a UI to present ARC database export options. It communicates with the `ArcDataExportElement` via events.

```html
<arc-export-form withEncrypt provider="drive" parentId="drive file id"></arc-export-form>
```

### ArcDataExportElement

A component that handles ARC data export logic via events. It takes care for creating an export object for ARC data, encrypting the content (when requested) and to produce communicate with the export provides via event.

This element should be inserted into the DOM somewhere in the project.

```html
<are-data-export appversion="major.minor.patch" electroncookies></are-data-export>
```

### ArcDataImportElement

The opposite of the `ArcDataExportElement` element. Provides the logic for the import flow and communicates with other components via the events system to finish the import flow.

```html
<are-data-import></are-data-import>
```

## Development

```sh
git clone https://github.com/@advanced-rest-client/arc-ie
cd arc-ie
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests

```sh
npm test
```
