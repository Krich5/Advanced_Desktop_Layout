# Advanced Desktop Layout

Standalone HTML/JS/CSS helper panel you can iframe inside Webex Contact Center Agent Desktop to update a global variable.

## Quick start

1) Open `index.html` in a browser (no build step required).  
2) Fill in the variable name, type, value, API base URL, and a valid Bearer token, then submit.

## Embedding as an iframe

Serve the folder via your preferred static host (or a simple local server) and embed:

```html
<iframe
  src="https://your-host/Advanced%20Desktop%20Layout/"
  width="100%"
  height="600"
  style="border:0;"
></iframe>
```

You can inject the token and other params via query string and pre-fill the form with a small script if desired. No external dependencies are used.
