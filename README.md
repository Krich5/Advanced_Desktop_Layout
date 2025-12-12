# Advanced Desktop Layout

Standalone HTML/JS/CSS helper panel you can iframe inside Webex Contact Center Agent Desktop to update a global variable.

## Quick start

1) Open `index.html` in a browser (no build step required).  
2) Fill in the variable name, type, value, API base URL, and a valid Bearer token, then submit.

## Embedding as an iframe

Serve the folder via your preferred static host (or a simple local server) and embed:

```html
        {
            "nav": {
              "label": "Supervisor Controls",
              "icon": "settings",
              "iconType": "momentum",
              "navigateTo": "SupervisorControls",
              "align": "top"
            },
            "page": {
              "id": "SupervisorControls",
              "widgets": {
                "comp1": {
                  "comp": "global-variable-manager",
                  "script": "https://krich5.github.io/Advanced_Desktop_Layout/SupervisorControls.js",
                  "attributes": {
                    "token": "$STORE.auth.accessToken",
                    "org-id": "$STORE.agent.orgId",
                    "data-center": "$STORE.app.datacenter",
                    "variable-id": "ed98c1dc-00c0-4db0-9926-c88422405e0a",
                    "variable-id-2": "122a83ab-8fcf-4031-b31e-1273f6f181cc"
                  }
                }
              },
              "layout": {
                "areas": [["comp1"]],
                "size": {
                  "cols": [1],
                  "rows": [1]
              }
            }
          }
        }
```

You can inject the token and other params via query string and pre-fill the form with a small script if desired. No external dependencies are used.
