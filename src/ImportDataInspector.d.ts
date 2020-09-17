import {LitElement, CSSResult, TemplateResult} from 'lit-element';
import { DataExport } from '@advanced-rest-client/arc-types';

export const importHandler: unique symbol;
export const cancelHandler: unique symbol;
export const getTableData: unique symbol;
export const createdTemplate: unique symbol;
export const requestsTableTemplate: unique symbol;
export const historyTableTemplate: unique symbol;
export const variablesTableTemplate: unique symbol;
export const cookiesTableTemplate: unique symbol;
export const authDataTableTemplate: unique symbol;
export const urlsTableTemplate: unique symbol;
export const socketUrlsTableTemplate: unique symbol;
export const ccTableTemplate: unique symbol;
export const actionsTemplate: unique symbol;

/**
 * An element to display tables of import data.
 */
export class ImportDataInspector extends LitElement {
  static readonly styles: CSSResult;

  /**
   * Imported data.
   */
  data: DataExport.ArcExportObject[];

  /**
   * Enables compatibility with Anypoint platform
   */
  compatibility?: boolean;

  constructor();

  /**
   * Dispatches the `cancel` event
   */
  [cancelHandler](): void;

  /**
   * Dispatches the `import` event
   */
  [importHandler](): void;

  /**
   * Collects information about selected data in the data table.
   *
   * @param name Data table element name to check data for.
   * @returns List of items or undefined if the table is
   * not in the DOM, the table is hidden or selection is empty.
   */
  [getTableData](name: string): any[]|undefined;

  /**
   * Collects import data from the tables.
   * Only selected items are in the final object.
   *
   * @returns ARC import object with updated arrays.
   * Note, the object is a shallow copy of the original data object.
   */
  collectData(): DataExport.ArcExportObject;

  render(): TemplateResult;

  /**
   * @returns A template for the table actions.
   */
  [actionsTemplate](): TemplateResult;

  [createdTemplate](data: DataExport.ArcExportObject): boolean;
  [requestsTableTemplate](data: DataExport.ArcExportObject, compatibility: boolean): TemplateResult|string;
  [historyTableTemplate](data: DataExport.ArcExportObject, compatibility: boolean): TemplateResult|string;
  [variablesTableTemplate](data: DataExport.ArcExportObject, compatibility: boolean): TemplateResult|string;
  [cookiesTableTemplate](data: DataExport.ArcExportObject, compatibility: boolean): TemplateResult|string;
  [authDataTableTemplate](data: DataExport.ArcExportObject, compatibility: boolean): TemplateResult|string;
  [urlsTableTemplate](data: DataExport.ArcExportObject, compatibility: boolean): TemplateResult|string;
  [socketUrlsTableTemplate](data: DataExport.ArcExportObject, compatibility: boolean): TemplateResult|string;
  [ccTableTemplate](data: DataExport.ArcExportObject, compatibility: boolean): TemplateResult|string;
}
