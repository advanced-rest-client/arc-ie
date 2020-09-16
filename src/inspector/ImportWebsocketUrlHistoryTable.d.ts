import {ImportBaseTable} from './ImportBaseTable.js';
import {TemplateResult} from 'lit-element';
import { DataExport } from '@advanced-rest-client/arc-types';

/**
 * An element to render list of URLs hsitory to import.
 */
export declare  class ImportWebsocketUrlHistoryTable extends ImportBaseTable<DataExport.ExportArcWebsocketUrl> {
  itemBodyTemplate(item: DataExport.ExportArcWebsocketUrl): TemplateResult;
}
