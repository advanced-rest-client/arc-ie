import {ImportBaseTable} from './ImportBaseTable.js';
import {CSSResult, TemplateResult} from 'lit-element';
import { DataExport } from '@advanced-rest-client/arc-types';

export declare interface ProjectItem {
  projectId: string;
  requests: DataExport.ExportArcSavedRequest[];
}

/**
 * An element to display list of request objects to import.
 */
export declare class ImportRequestsTable extends ImportBaseTable<DataExport.ExportArcSavedRequest> {
  static readonly styles: CSSResult[];
  /**
   * List of projects included in the import
   */
  projects: DataExport.ExportArcProjects[];
  /**
   * List of requests related to a project
   */
  nonProjects: string[];
  /**
   * List of requests not related to any project
   */
  projectsData: object[];

  constructor();

  /**
   * @returns A main template function
   */
  render(): TemplateResult;

  /**
   * @returns A template for the list of projects.
   */
  projectsTemplate(): TemplateResult[]|string;
  /**
   * @returns A template for a request
   */
  requestsTemplate(): TemplateResult[]|string;

  /**
   * @param item The request to render.
   * @returns A template for a request
   */
  itemBodyTemplate(item: DataExport.ExportArcSavedRequest): TemplateResult;
  /**
   * @param item The request to render.
   * @returns A template for a request list item
   */
  itemBodyContentTemplate(item: DataExport.ExportArcSavedRequest): TemplateResult;

  _dataChanged(data: DataExport.ExportArcSavedRequest[]): void;

  /**
   * Computes a label for a project
   * @param id Project id
   * @param list [description]
   * @returns Project label
   */
  _computeProjectLabel(id: string, list: DataExport.ExportArcProjects[]): string;
}
