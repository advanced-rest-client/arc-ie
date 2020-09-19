import {LitElement, TemplateResult, CSSResult} from 'lit-element';
import { AnypointSelector } from '@anypoint-web-components/anypoint-selector';

export const toggleSelectedAll: unique symbol;
export const toggleSelectedAllClick: unique symbol;
export const selectedHandler: unique symbol;
export const dataChanged: unique symbol;
export const createSelectionArray: unique symbol;
export const toggleOpenedHandler: unique symbol;

export abstract declare class ImportBaseTable<T> extends LitElement {
  static readonly styles: CSSResult|CSSResult[];

  /**
   * Title of the table when using base table
   */
  tableTitle: string;

  /**
   * Indicates if the table is displaying list of items
   */
  opened: boolean;

  /**
   * The data to display.
   */
  data: T[];

  /**
   * List of IDs of selected items.
   */
  selectedIndexes: string[];

  /**
   * True to select all elements from the list
   */
  allSelected: boolean;

  /**
   * Enables compatibility with Anypoint platform
   */
  compatibility: boolean;

  /**
   * If true, the user selected some elements on list. Check the
   * `this.selectedIndexes` property to check for the selected elements.
   */
  readonly hasSelection: boolean;
  readonly list: AnypointSelector;
  readonly selectedItems: T[];
  headerTemplate(): TemplateResult;
  contentTemplate(): TemplateResult;

  constructor();
  firstUpdated(): void;

  /**
   * Handler for the toggle table click.
   */
  [toggleOpenedHandler](e: PointerEvent): void;
  /**
   * Toggles opened state
   */
  toggleOpened(): void;
  [createSelectionArray](items: T[]): string[];
  [dataChanged](data: T[]): void;
  setSelected(values: string[]): void;
  [selectedHandler](e: CustomEvent): void;
  [toggleSelectedAllClick](e: PointerEvent): void;
  [toggleSelectedAll](e: CustomEvent): void;
  render(): TemplateResult;
  itemBodyContentTemplate(item: T, index: number): TemplateResult;
  abstract itemBodyTemplate(item: T, index: number): TemplateResult|string;
  repeaterTemplate(data: T[]): TemplateResult|TemplateResult[]|string;
}
