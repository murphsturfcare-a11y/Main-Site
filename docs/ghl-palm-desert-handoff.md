# Claude handoff: Palm Desert GHL tag

The user authorized adding Palm Desert and asked to pass GHL account work to Claude. The Codex GHL connector returned HTTP 401 `Invalid JWT`; no account changes or real leads were sent from this task.

## Account and tag

1. Open the existing Murphy's Turf GHL sub-account used by the website's deployed `GHL_LOCATION_ID`. Verify the business identity and match the four existing region tags before writing. Do not create a new sub-account or infer an office address from the map pin.
2. Find or create the tag **`location-palm-desert`**, exactly lowercase and hyphenated. Preserve the existing **`website-lead`** tag.
3. The site applies the same regional tag to Palm Desert, Indian Wells, Bermuda Dunes, La Quinta, Indio and Coachella, for both residential and commercial requests. Sun City Palm Desert / Desert Palms are covered by the Palm Desert hub. Do not create city-specific tags unless the business requests them.

Existing regional convention: `location-murrieta`, `location-huntington-beach`, `location-martinez`, `location-sacramento`.

## Routing and fields

The new tag must be recognized by the existing lead-routing process. Inspect how the other region tags assign leads, select pipelines and notify the responsible team. If the Palm Desert recipient/assignee or pipeline cannot be established from approved business configuration, report that missing decision rather than copying an unrelated recipient. Creating a tag alone does not establish workflow routing.

The website keeps `source: Website` and the following existing custom fields:

| Field | ID | Value |
| --- | --- | --- |
| Turf issues | `WtYBOqmmraY1I9fy5xa9` | Visitor selection |
| Timeline | `ImZSphv7MkTINVPnx5cc` | Visitor selection |
| Communication consent | `EkqebbONQPtvVGj4lauv` | `Yes` or `No` |
| Contact Source | `zXPUvnAUEX1nFUT0kRKM` | `Website - Palm Desert`, or the canonical page city |

Do not replace the Contact Source format or existing field IDs. The visitor's typed property city remains separate from the page's validated routing city.

Consented campaign context is saved as a contact note after contact creation. Optional `GHL_ATTRIBUTION_FIELD_IDS` can map the allowlisted parameters to real existing custom fields; do not invent IDs or assume notes populate GHL's native attribution panels. Analytics consent and communication consent are separate.

## Verification and return evidence

- Verify the exact tag exists in the correct sub-account and record its tag ID.
- Verify the regional workflow recognizes the tag and identify the approved assignee/notification destination without exposing credentials.
- Once production is deployed and a live test is authorized, use an explicitly labeled fictional test lead through the actual Palm Desert quote form. Check contact receipt, both tags, city, existing custom fields and campaign note when analytics was accepted. Avoid unsolicited calls, texts or emails to real people.
- Report contact creation, workflow entry, notification dispatch and actual delivery separately. Do not call the flow verified merely because the website shows success.
- Include the tested URL and observed result. Keep test contact IDs in the private handoff; do not commit real contact data or secrets.

The implementation already has local tests through the actual form and Netlify handler with mocked CRM endpoints. Those tests do not establish live GHL receipt or routing.
