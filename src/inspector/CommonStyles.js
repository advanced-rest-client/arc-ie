import { css } from 'lit-element';

export default css`
:host {
  display: block;
  padding: 0 16px;
  margin-bottom: 24px;
}

:host([opened]) {
  padding-bottom: 16px;
}

.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}

h3 {
  flex: 1;
  font-size: var(--arc-font-title-font-size);
  font-weight: var(--arc-font-title-font-weight);
  line-height: var(--arc-font-title-line-height);
  font-weight: 400;
  margin-left: 14px;
}

.toggle-icon {
  transition: transform 0.2s ease-in-out;
}

.toggle-icon.opened {
  transform: rotate(-180deg);
}

.table-options {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
  margin: 24px 0;
}

.table-options .hidable {
  opacity: 1;
  transition: opacity 0.2s cubic-bezier(0.47, 0, 0.75, 0.72);
}

.table-options.inactive .hidable {
  pointer-events: none;
  opacity: 0;
}

.method-label {
  min-width: 90px;
}

.selected-counter {
  display: inline-block;
  margin-left: 28px;
  font-size: 16px;
  font-weight: 500;
}

http-method-label {
  font-size: 13px;
  padding: 8px;
}

.icon {
  display: block;
  fill: currentColor;
  width: 24px;
  height: 24px;
}

.no-wrap {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
`;
