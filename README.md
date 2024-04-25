# Isomorphic Lolcat

Small library based on [lolcatjs](https://github.com/robertmarsal/lolcatjs)
that can be used in Node.js or Browser, to render gradient text.

![Rainbow color ASCII art](https://github.com/jcubic/isomorphic-lolcat/blob/master/screenshot.png?raw=true)


[Demo](http://jcubic.github.io/isomorphic-lolcat).

## Installation

```bash
npm install isomorphic-lolcat
```

## Usage

Node

```javascript
const lolcat = require('isomorphic-lolcat');
```

Browser

```html
<script src="https://cdn.jsdelivr.net/npm/isomorphic-lolcat"></script>
```

## API

* **lolcat.format((char: string, color: color) => string, input: string, (line: number) => void): string[]**

Low lovel function, first argument is function that is called on each character.
First argument to function is single character second is object with `red`,
`green` and `blue` properties of type number.

Return array of string value is single lolcat string.

### Example

```javascript
const styles = [];
let i = 20;
const o = rand(256);
function eachLine() {
  i -= 1;
  lolcat.options.seed = o + i;
}

function rand(max) {
    return Math.floor(Math.random() * (max + 1));
}

// render Style console in Browser
console.log(lolcat.format(function(char, color) {
    styles.push(`color: ${hex(color)}; background: black`);
    return `%c${char}`;
}, 'Lorem Ipsum Dolor Sit Amet', eachLine), ...styles);
```

* **lolcat.rainbow((char: string, color: Color) => string, input: string, seed: number): string[]**

Shortcut using above example that use default seed for each line:


```javascript
const styles = [];

function format(char, color) {
    styles.push(`color: ${hex(color)}; background: black`);
    return `%c${char}`;
}

console.log(lolcat.rainbow(format, 'Lorem Ipsum Dolor Sit Amet').join('\n'), ...styles);
```

* **lolcat.options**

```javascript
options: {
    // Seed of the rainbow, use the same for the same pattern
    seed: 0,
    // Spread of the rainbow
    spread: 8.0,
    // Frequency of the rainbow colors
    freq: 0.3,
}
```

## License

Copyright (C) 2020 [Jakub T. Jankiewicz](https://jcubic.pl) <jcubic@onet.pl>

Copyright (C) 2015 [Robert Boloc](https://github.com/robertmarsal) <robertboloc@gmail.com>

Released with WTFPL License
