/** @prettier */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { throttle } from 'throttle-debounce';

const DEFAULT_LABEL_TEXT = 'scrollable';

@customElement('sws-scrollable-container')
class SwsScrollableContainer extends LitElement {
  static styles = css`
    :host {
      --sws-scrollable-container-position: relative;
      --sws-scrollable-container-shadow-size: 0.9375rem;
      --sws-scrollable-container-shadow-from-x: 0;
      --sws-scrollable-container-shadow-from-y: 0;
      --sws-scrollable-container-shadow-to-x: 0;
      --sws-scrollable-container-shadow-to-y: 0;

      --sws-scrollable-container-notification-top: 3.125rem;
      --sws-scrollable-container-notification-left: calc(
        (100% - var(--sws-scrollable-container-notification-size)) / 2
      );
      --sws-scrollable-container-notification-size: 6.25rem;
      --sws-scrollable-container-notification-padding: 0.75rem;
      --sws-scrollable-container-notification-gap: 0.5rem;
      --sws-scrollable-container-notification-color: #fff;
      --sws-scrollable-container-notification-background-color: rgba(0, 0, 0, 0.5);
      --sws-scrollable-container-notification-backdrop-filter: blur(0.187rem);
      --sws-scrollable-container-notification-border-radius: 0.625rem;
      --sws-scrollable-container-notification-box-shadow: 0.125rem 0.125rem 0.25rem
        rgba(0, 0, 0, 0.2);

      --sws-scrollable-container-icon-scale: 1.5;

      --sws-scrollable-container-message-font-size: 0.75rem;
      --sws-scrollable-container-message-line-height: 1.25;
    }

    .scrollable-container {
      box-sizing: border-box;
      position: var(--sws-scrollable-container-position);
    }

    .scrollable-container__main {
      box-sizing: border-box;
      position: relative;
    }

    .scrollable-container__main[is-horizontal][is-scrollable] {
      overflow-x: scroll;
    }

    .scrollable-container__main[is-vertical][is-scrollable] {
      overflow-y: scroll;
    }

    .scrollable-container__notify {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: var(--sws-scrollable-container-notification-gap);
      position: absolute;
      top: var(--sws-scrollable-container-notification-top);
      left: var(--sws-scrollable-container-notification-left);
      width: var(--sws-scrollable-container-notification-size);
      height: var(--sws-scrollable-container-notification-size);
      padding: var(--sws-scrollable-container-notification-padding);
      color: var(--sws-scrollable-container-notification-color);
      background-color: var(--sws-scrollable-container-notification-background-color);
      backdrop-filter: var(--sws-scrollable-container-notification-backdrop-filter);
      border-radius: var(--sws-scrollable-container-notification-border-radius);
      box-shadow: var(--sws-scrollable-container-notification-box-shadow);
      visibility: hidden;
      opacity: 0;
      transform: scale(0);
      transition: opacity 0.3s, visibility 0s linear 0.3s, transform 0s linear 0.3s;
    }

    .scrollable-container__notify[is-active] {
      visibility: visible;
      opacity: 1;
      transform: scale(1);
      transition: opacity 0.3s, visibility 0.3s linear 0s, transform 0s linear 0s;
    }

    .scrollable-container__picture {
      box-sizing: border-box;
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 100%;
    }

    .scrollable-container__icon {
      fill: currentColor;
    }

    .scrollable-container__icon[is-horizontal] {
      animation: swipe-horizontal 1s linear infinite;
    }

    .scrollable-container__icon[is-vertical] {
      animation: swipe-vertical 1s linear infinite;
    }

    .scrollable-container__message {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 100%;
      text-align: center;
      line-height: var(--sws-scrollable-container-message-line-height);
      font-size: var(--sws-scrollable-container-message-font-size);
    }

    .scrollable-container__shadow {
      box-sizing: border-box;
      position: absolute;
      background-repeat: no-repeat;
      transition: transform 0.1s;
      pointer-events: none;
    }

    .scrollable-container__shadow[is-horizontal] {
      background-size: var(--sws-scrollable-container-shadow-size) 150%;
    }

    .scrollable-container__shadow[is-vertical] {
      background-size: 150% var(--sws-scrollable-container-shadow-size);
    }

    .scrollable-container__shadow.from {
      --sws-scrollable-container-shadow-from-scale: 0;

      top: var(--sws-scrollable-container-shadow-from-y);
      left: var(--sws-scrollable-container-shadow-from-x);
    }

    .scrollable-container__shadow.from[is-horizontal] {
      width: var(--sws-scrollable-container-shadow-size);
      height: 100%;
      background-image: radial-gradient(at left, rgba(0, 0, 0, 0.2), transparent 70%);
      background-position: left 50%;
      transform: scaleX(var(--sws-scrollable-container-shadow-from-scale));
      transform-origin: left 50%;
    }

    .scrollable-container__shadow.from[is-vertical] {
      width: 100%;
      height: var(--sws-scrollable-container-shadow-size);
      background-image: radial-gradient(at top, rgba(0, 0, 0, 0.2), transparent 70%);
      background-position: 50% top;
      transform: scaleY(var(--sws-scrollable-container-shadow-from-scale));
      transform-origin: 50% top;
    }

    .scrollable-container__shadow.to {
      right: var(--sws-scrollable-container-shadow-to-x);
      bottom: var(--sws-scrollable-container-shadow-to-y);
    }

    .scrollable-container__shadow.to[is-horizontal] {
      --sws-scrollable-container-shadow-to-scale: 0;

      width: var(--sws-scrollable-container-shadow-size);
      height: 100%;
      background-image: radial-gradient(at right, rgba(0, 0, 0, 0.2), transparent 70%);
      background-position: right 50%;
      transform: scaleX(var(--sws-scrollable-container-shadow-to-scale));
      transform-origin: right 50%;
    }

    .scrollable-container__shadow.to[is-vertical] {
      width: 100%;
      height: var(--sws-scrollable-container-shadow-size);
      background-image: radial-gradient(at bottom, rgba(0, 0, 0, 0.2), transparent 70%);
      background-position: 50% bottom;
      transform: scaleY(var(--sws-scrollable-container-shadow-to-scale));
      transform-origin: 50% bottom;
    }

    @keyframes swipe-horizontal {
      0% {
        transform: translate3d(100%, 0, 0) scale(var(--sws-scrollable-container-icon-scale));
        opacity: 0;
      }
      20% {
        opacity: 1;
      }
      80% {
        opacity: 1;
      }
      100% {
        transform: translate3d(-100%, 0, 0) scale(var(--sws-scrollable-container-icon-scale));
        opacity: 0;
      }
    }

    @keyframes swipe-vertical {
      0% {
        transform: translate3d(0, 100%, 0) scale(var(--sws-scrollable-container-icon-scale));
        opacity: 0;
      }
      20% {
        opacity: 1;
      }
      80% {
        opacity: 1;
      }
      100% {
        transform: translate3d(0, -100%, 0) scale(var(--sws-scrollable-container-icon-scale));
        opacity: 0;
      }
    }
  `;

  @property({ type: String, attribute: 'label' })
  label = DEFAULT_LABEL_TEXT;

  @property({ type: Boolean, attribute: 'is-vertical' })
  isVertical = false;

  @property({ type: Boolean, attribute: 'is-hide-notification' })
  isHideNotification = false;

  @property({ type: Boolean, attribute: false })
  isScrollable = false;

  @property({ type: Boolean, attribute: false })
  notificationEnabled = false;

  private elMain: HTMLDivElement | null | undefined;
  private elShadowFrom: HTMLDivElement | null | undefined;
  private elShadowTo: HTMLDivElement | null | undefined;
  private handleResize;
  private currentScreenWidth = window.innerWidth;

  constructor() {
    super();
    this.handleResize = throttle(150, () => {
      if (this.currentScreenWidth === window.innerWidth) {
        return;
      }
      this._initialize();
      this.currentScreenWidth = window.innerWidth;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return html`
      <div class="scrollable-container">
        <div
          ?is-vertical="${this.isVertical}"
          ?is-horizontal="${!this.isVertical}"
          ?is-scrollable="${this.isScrollable}"
          class="scrollable-container__main"
          @scroll="${throttle(150, this._onScroll)}"
        >
          <slot></slot>
          <div class="scrollable-container__notify" ?is-active="${this.notificationEnabled}">
            <div class="scrollable-container__picture">
              <svg
                ?is-vertical="${this.isVertical}"
                ?is-horizontal="${!this.isVertical}"
                width="24"
                height="24"
                class="scrollable-container__icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z"
                />
              </svg>
            </div>
            <div class="scrollable-container__message">${this.label}</div>
          </div>
        </div>
        <div
          class="scrollable-container__shadow from"
          ?is-vertical="${this.isVertical}"
          ?is-horizontal="${!this.isVertical}"
        ></div>
        <div
          class="scrollable-container__shadow to"
          ?is-vertical="${this.isVertical}"
          ?is-horizontal="${!this.isVertical}"
        ></div>
      </div>
    `;
  }

  firstUpdated() {
    this.elMain = this.shadowRoot?.querySelector<HTMLDivElement>('.scrollable-container__main');
    this.elShadowFrom = this.shadowRoot?.querySelector<HTMLDivElement>(
      '.scrollable-container__shadow.from'
    );
    this.elShadowTo = this.shadowRoot?.querySelector<HTMLDivElement>(
      '.scrollable-container__shadow.to'
    );

    this._initialize();

    window.addEventListener('resize', this.handleResize);
  }

  private _initialize(): void {
    this.isScrollable = this._isScrollable();
    if (!this.isHideNotification) {
      this.notificationEnabled = this.isScrollable;
    }
    this._setShadow();
  }

  private _isScrollable(): boolean {
    if (!this.elMain) {
      return false;
    }
    if (this.isVertical) {
      return this.elMain.clientHeight < this.elMain.scrollHeight;
    }
    return this.elMain.clientWidth < this.elMain.scrollWidth;
  }

  private _canScrollFrom(): boolean {
    if (!this.elMain) {
      return false;
    }
    if (this.isVertical) {
      return this.elMain.scrollTop !== 0;
    }
    return this.elMain.scrollLeft !== 0;
  }

  private _canScrollTo(): boolean {
    if (!this.elMain) {
      return false;
    }
    if (this.isVertical) {
      return this.elMain.scrollTop + this.elMain.offsetHeight !== this.elMain.scrollHeight;
    }
    return this.elMain.scrollLeft + this.elMain.offsetWidth !== this.elMain.scrollWidth;
  }

  private _setShadow(): void {
    if (this.elShadowFrom) {
      this.elShadowFrom.style.setProperty(
        '--sws-scrollable-container-shadow-from-scale',
        `${this._getFromShadowScale()}`
      );
    }
    if (this.elShadowTo) {
      this.elShadowTo.style.setProperty(
        '--sws-scrollable-container-shadow-to-scale',
        `${this._getToShadowScale()}`
      );
    }
  }

  private _getFromShadowScale(): number {
    if (!this.elMain || !this.elShadowFrom || !this.elShadowTo) {
      return 0;
    }
    const size = this.isVertical ? this.elShadowFrom.clientHeight : this.elShadowFrom.clientWidth;
    const pos = this.isVertical ? this.elMain.scrollTop : this.elMain.scrollLeft;
    if (pos < size) {
      return pos / size;
    }
    return 1;
  }

  private _getToShadowScale(): number {
    if (!this.elMain || !this.elShadowFrom || !this.elShadowTo) {
      return 0;
    }
    if (this.isVertical) {
      const size = this.elShadowTo.clientHeight;
      const pos = this.elMain.scrollTop + this.elMain.offsetHeight;
      if (pos > this.elMain.scrollHeight - size) {
        return (this.elMain.scrollHeight - pos) / size;
      }
      return 1;
    } else {
      const size = this.elShadowTo.clientWidth;
      const pos = this.elMain.scrollLeft + this.elMain.offsetWidth;
      if (pos > this.elMain.scrollWidth - size) {
        return (this.elMain.scrollWidth - pos) / size;
      }
      return 1;
    }
  }

  private _onScroll(e: MouseEvent): void {
    this._setShadow();
    this.notificationEnabled = false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sws-scrollable-container': SwsScrollableContainer;
  }
}
