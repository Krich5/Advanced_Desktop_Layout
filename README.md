# Supervisor Controls Widget for Webex Contact Center

A single-file, no-build widget (`SupervisorControls.js`) you can host (GitHub Pages or any static host) and drop into a Webex Contact Center Agent Desktop layout. It lets supervisors:
- Update an advisory message (global variable).
- Toggle CCB (boolean global variable).
- View/update override hours (start/end, working flag) and an override message (global variable) that shows only when the override is enabled.

## Attributes to pass from the Desktop Layout
All attributes are required unless noted.
- `script`: URL to the hosted `SupervisorControls.js`.
- `token`: `$STORE.auth.accessToken`
- `org-id`: `$STORE.auth.orgId`
- `data-center`: e.g., `us1`
- `globvar-advisory-message-id`: CAD variable ID for the advisory message (string).
- `globvar-ccb-id`: CAD variable ID for the CCB toggle (Boolean).
- `override-id`: Override Hours ID (for the overrides API).
- `override-message-var-id`: CAD variable ID for the override message (string).
- `base-url` (optional): Override the API base if needed (defaults by data center).

## Sample layout snippet (actions widget)
```json
"widgets": {
  "comp1": {
    "comp": "actions",
    "script": "https://yourhost/SupervisorControls.js",
    "attributes": {
      "token": "$STORE.auth.accessToken",
      "org-id": "$STORE.auth.orgId",
      "data-center": "us1",
      "globvar-advisory-message-id": "<advisory-var-id>",
      "globvar-ccb-id": "<ccb-var-id>",
      "override-id": "<override-id>",
      "override-message-var-id": "<override-message-var-id>"
    }
  }
}
```


## API calls used
- `GET/PUT /organization/{orgId}/cad-variable/{id}` for CAD/global variables.
- `GET/PUT /organization/{orgId}/overrides/{id}` for override hours.
Token must have rights to read/update the referenced resources.

## Hosting
- Host `SupervisorControls.js` on GitHub Pages or any static file host, then reference its URL in the Desktop Layout.


