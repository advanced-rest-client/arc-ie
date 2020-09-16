/* eslint-disable class-methods-use-this */
/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import { html, css } from 'lit-element';
import '@anypoint-web-components/anypoint-collapse/anypoint-collapse.js';
import '@advanced-rest-client/arc-icons/ArcIcons.js';
import '@anypoint-web-components/anypoint-button/anypoint-icon-button.js'
import '@api-components/http-method-label/http-method-label.js';
import { ImportBaseTable } from './ImportBaseTable.js';
import styles from './CommonStyles.js';

/** @typedef {import('lit-element').CSSResult} CSSResult */
/** @typedef {import('lit-element').TemplateResult} TemplateResult */
/** @typedef {import('@advanced-rest-client/arc-types').DataExport.ExportArcSavedRequest} ExportArcSavedRequest */
/** @typedef {import('@advanced-rest-client/arc-types').DataExport.ExportArcProjects} ExportArcProjects */
/** @typedef {import('./ImportRequestsTable').ProjectItem} ProjectItem */

/**
 * An element to display list of request objects to import.
 */
export class ImportRequestsTable extends ImportBaseTable {
  /**
   * @type {CSSResult[]}
   */
  static get styles() {
    return [
      styles,
      css`
      .selected-counter {
        margin-left: 32px;
      }

      .project-header {
        font-size: var(--arc-font-headline-font-size);
        font-weight: var(--arc-font-headline-font-weight);
        letter-spacing: var(--arc-font-headline-letter-spacing);
        line-height: var(--arc-font-headline-line-height);
        height: 48px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 12px;
      }

      .project-block {
        background-color: var(--import-table-title-request-project-background-color, #F5F5F5);
        margin-bottom: 12px;
      }
      `
    ];
  }

  static get properties() {
    return {
      /**
       * List of projects included in the import
       */
      projects: { type: Array },
      /**
       * List of requests related to a project
       */
      nonProjects: { type: Array },
      /**
       * List of requests not related to any project
       */
      projectsData: { type: Array }
    };
  }

  constructor() {
    super();
    /**
     * @type {ExportArcProjects[]}
     */
    this.projects = undefined;
    /**
     * @type {string[]}
     */
    this.nonProjects = undefined;
    /**
     * @type {ProjectItem[]}
     */
    this.projectsData = undefined;
  }

  render() {
    return html`
    ${this.headerTemplate}
    <anypoint-collapse .opened="${this.opened}">
      ${this.tableHeaderTemplate}
      <anypoint-selector
        multi
        toggle
        attrforselected="data-key"
        selectable="anypoint-icon-item"
        .selectedValues="${this.selectedIndexes}"
        @selectedvalues-changed="${this._selectedHandler}">
      ${this.projectsTemplate()}
      ${this.requestsTemplate()}
      </anypoint-selector>
    </anypoint-collapse>`;
  }

  /**
   * @return {TemplateResult[]|string} A template for the list of projects.
   */
  projectsTemplate() {
    const { projectsData, projects } = this;
    if (!projectsData || !projectsData.length) {
      return '';
    }
    return projectsData.map((item) => html`
    <div class="project-block" data-project="${item.projectId}">
      <div class="project-header">Project: ${this._computeProjectLabel(item.projectId, projects)}</div>
    </div>
    ${this.repeaterTemplate(item.requests)}
    `);
  }

  /**
   * @return {TemplateResult} A template for a request
   */
  requestsTemplate() {
    const { nonProjects } = this;
    return html`<div class="project-block">
      <div class="project-header">Default</div>
    </div>
    ${this.repeaterTemplate(nonProjects)}`;
  }

  /**
   * @param {ExportArcSavedRequest} item The request to render.
   * @return {TemplateResult} A template for a request
   */
  itemBodyTemplate(item) {
    return html`
    <div class="no-wrap">${item.name}</div>
    <div secondary class="no-wrap">${item.url}</div>
    `;
  }

  /**
   * @param {ExportArcSavedRequest} item The request to render.
   * @return {TemplateResult} A template for a request list item
   */
  itemBodyContentTemplate(item) {
    return html`
    <span class="method-label">
      <http-method-label method="${item.method}"></http-method-label>
    </span>
    <anypoint-item-body twoline>
      ${this.itemBodyTemplate(item)}
    </anypoint-item-body>`;
  }

  /**
   * @param {ExportArcSavedRequest[]} data
   */
  _dataChanged(data) {
    super._dataChanged(data);
    if (!data) {
      return;
    }
    const nonProjects = [];
    const projectsData = {};
    data.forEach((item) => {
      if (item.projects && item.projects.length) {
        item.projects.forEach((p) => {
          if (p in projectsData) {
            projectsData[p].push(item);
          } else {
            projectsData[p] = /** @type ExportArcSavedRequest[] */ ([item]);
          }
        });
      } else {
        nonProjects.push(item);
      }
    });
    this.nonProjects = nonProjects;
    this.projectsData = Object.keys(projectsData).map((id) => {
      return /** @type ProjectItem */ ({
        projectId: id,
        requests: projectsData[id],
      });
    });
  }

  /**
   * Computes a label for a project
   * @param {string} id Project id
   * @param {ExportArcProjects[]} list [description]
   * @return {string} Project label
   */
  _computeProjectLabel(id, list) {
    if (!id || !list || !list.length) {
      return '';
    }
    const project = list.find((item) => item._id === id);
    if (!project) {
      return '';
    }
    return project.name;
  }
}
