import { html } from 'lit-html';
import { DemoPage } from '@advanced-rest-client/arc-demo-helper';
import { DataGenerator } from '@advanced-rest-client/arc-data-generator';
import '@polymer/paper-toast/paper-toast.js';
import '../import-data-inspector.js';

/** @typedef {import('@advanced-rest-client/arc-types').DataExport.ArcExportObject} ArcExportObject */
/** @typedef {import('@advanced-rest-client/arc-types').DataExport.ExportArcCookie} ExportArcCookie */
/** @typedef {import('@advanced-rest-client/arc-types').DataExport.ExportArcVariable} ExportArcVariable */
/** @typedef {import('@advanced-rest-client/arc-types').DataExport.ExportArcHistoryRequest} ExportArcHistoryRequest */
/** @typedef {import('@advanced-rest-client/arc-types').DataExport.ExportArcUrlHistory} ExportArcUrlHistory */
/** @typedef {import('@advanced-rest-client/arc-types').DataExport.ExportArcWebsocketUrl} ExportArcWebsocketUrl */
/** @typedef {import('@advanced-rest-client/arc-types').DataExport.ExportArcAuthData} ExportArcAuthData */

class ComponentPage extends DemoPage {
  constructor() {
    super();
    this.initObservableProperties([
      'data'
    ]);
    this.componentName = 'import-data-inspector';
    this.generator = new DataGenerator();
    this.data = this.generate();
  }

  mapExportKeys(item) {
    item.key = item._id;
    delete item._id;
    delete item._rev;
    return item;
  }

  /**
   * @return {ArcExportObject}
   */
  generate() {
    const saved = this.generator.generateSavedRequestData({
      requestsSize: 50,
      projectsSize: 3
    });
    const history = /** @type ExportArcHistoryRequest[] */ (this.generator.generateHistoryRequestsData({
      requestsSize: 120
    })).map(this.mapExportKeys);
    return {
      kind: 'ARC#import',
      createdAt: '2017-09-28T19:43:09.491',
      version: '9.14.64.305',
      requests: saved.requests.map(this.mapExportKeys),
      projects: saved.projects.map(this.mapExportKeys),
      history,
      variables: /** @type ExportArcVariable[] */ (this.generator.generateVariablesData().map(this.mapExportKeys)),
      cookies: /** @type ExportArcCookie[] */ (this.generator.generateCookiesData().map(this.mapExportKeys)),
      urlhistory: /** @type ExportArcUrlHistory[] */ (this.generator.generateUrlsData().map(this.mapExportKeys)),
      websocketurlhistory: /** @type ExportArcWebsocketUrl[] */ (this.generator.generateUrlsData().map(this.mapExportKeys)),
      authdata: /** @type ExportArcAuthData[] */ (this.generator.generateBasicAuthData().map(this.mapExportKeys)),
    };
  }

  cancelled() {
    document.getElementById('cancelToast').opened = true;
  }

  imported(e) {
    document.getElementById('importToast').opened = true;
    console.log(e.detail);
  }

  _demoTemplate() {
    const {
      data
    } = this;
    return html`
      <section class="documentation-section">
        
        <div class="demo-wrapper">
          <import-data-inspector
            .data="${data}"
            @cancel="${this.cancelled}"
            @import="${this.imported}"
          ></import-data-inspector>
        </div>
      </section>

      <paper-toast text="Cancel has been pressed" id="cancelToast"></paper-toast>
      <paper-toast text="Import data has been pressed" id="importToast"></paper-toast>
    `;
  }

  contentTemplate() {
    return html`
      <h2>Import data inspector</h2>
      ${this._demoTemplate()}
    `;
  }
}

const instance = new ComponentPage();
instance.render();
