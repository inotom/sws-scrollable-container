# sws-scrollable-container

A Web Components to show scrollable hint.


## Demo

[Demo](https://sandbox.serendip.ws/sws-scrollable-container.html)


## Usage

Place `sws-scrollable-container` custom elements around the content.

```html
<sws-scrollable-container>
  ... inner content ...
</sws-scrollable-container>
<script type="module" src="sws-scrollable-container.min.js" defer></script>
```

Set element's style by css custom properties.

```css
sws-scrollable-container {
  --sws-scrollable-container-position: relative;
  --sws-scrollable-container-shadow-size: 0.9375rem;
  --sws-scrollable-container-shadow-from-x: 0;
  --sws-scrollable-container-shadow-from-y: 0;
  --sws-scrollable-container-shadow-to-x: 0;
  --sws-scrollable-container-shadow-to-y: 0;
  --sws-scrollable-container-notification-top: 3.125rem;
  --sws-scrollable-container-notification-left: calc((100% - var(--sws-scrollable-container-notification-size)) / 2);
  --sws-scrollable-container-notification-size: 6.25rem;
  --sws-scrollable-container-notification-padding: 0.75rem;
  --sws-scrollable-container-notification-gap: 0.5rem;
  --sws-scrollable-container-notification-color: #fff;
  --sws-scrollable-container-notification-background-color: rgba(0, 0, 0, 0.5);
  --sws-scrollable-container-notification-backdrop-filter: blur(0.187rem);
  --sws-scrollable-container-notification-border-radius: 0.625rem;
  --sws-scrollable-container-notification-box-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
  --sws-scrollable-container-icon-scale: 1.5;
  --sws-scrollable-container-message-font-size: 0.75rem;
  --sws-scrollable-container-message-line-height: 1.25;
  --sws-scrollable-container-message-white-space: normal;
}
```


## CSS custom properties

### sws-scrollable-container

| css custom property name                                   | content                               |  defaults                                                              |
|:-----------------------------------------------------------|:--------------------------------------|:-----------------------------------------------------------------------|
| `--sws-scrollable-container-position`                      | Position property                     | `relative`                                                             |
| `--sws-scrollable-container-shadow-size`                   | Inner shadow size                     | `0.9375rem`                                                            |
| `--sws-scrollable-container-shadow-from-x`                 | Left inner shadow offset              | `0`                                                                    |
| `--sws-scrollable-container-shadow-from-y`                 | Top inner shadow offset               | `0`                                                                    |
| `--sws-scrollable-container-shadow-to-x`                   | Right inner shadow offset             | `0`                                                                    |
| `--sws-scrollable-container-shadow-to-y`                   | Bottom inner shadow offset            | `0`                                                                    |
| `--sws-scrollable-container-notification-top`              | Notification box top position         | `3.125rem`                                                             |
| `--sws-scrollable-container-notification-left`             | Notification box left position        | `calc((100% - var(--sws-scrollable-container-notification-size)) / 2)` |
| `--sws-scrollable-container-notification-size`             | Notification box width/height size    | `6.25rem`                                                              |
| `--sws-scrollable-container-notification-padding`          | Notification box padding              | `0.75rem`                                                              |
| `--sws-scrollable-container-notification-gap`              | Notification box flexbox gap size     | `0.5rem`                                                               |
| `--sws-scrollable-container-notification-color`            | Notification box text color           | `#fff`                                                                 |
| `--sws-scrollable-container-notification-background-color` | Notification box background color     | `rgba(0, 0, 0, 0.5)`                                                   |
| `--sws-scrollable-container-notification-backdrop-filter`  | Notification box backdrop filter      | `blur(0.187rem)`                                                       |
| `--sws-scrollable-container-notification-box-shadow`       | Notification box shadow               | `0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.2)`                         |
| `--sws-scrollable-container-icon-scale`                    | Notification icon transform scale     | `1.5`                                                                  |
| `--sws-scrollable-container-message-font-size`             | Notification message font size        | `0.75rem`                                                              |
| `--sws-scrollable-container-message-line-height`           | Notification message line height      | `1.25`                                                                 |
| `--sws-scrollable-container-message-white-space`           | Notification message line white-space | `normal`                                                               |


## Options

```html
<sws-scrollable-container
  label="scrollable"
  is-vertical="false"
  is-hide-notification="false"
>
  ... inner content ...
</sws-scrollable-container>
```

### sws-scrollable-container

| option name            | content                              | defaults     |
|:-----------------------|:-------------------------------------|:-------------|
| `label`                | Notification label text.             | `scrollable` |
| `is-vertical`          | Scroll direction.                    | `false`      |
| `is-hide-notification` | Disable notification (only shadow).  | `false`      |


## License

MIT


## Author

inotom
