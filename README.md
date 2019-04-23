# GoogleSheet Query Language

> An Google Sheet Query language ORM

## Features

- Promise support
- Async support
- Easy syntax
- Good performance
- TypeScript codebase
- Free and tested (_for author needs are tested_)

## Description

Simple, modern and flexible Google Sheets query ORM-like helper which can make easier of your development

## Why

Not all of us can buy DB as a Servcie or buy DB from hosting for 1GB which costs ~20\$/month, so i decided, what would be if we use Google Sheets as DB

## Methods

### Example of your initialization (see demo folder)

```ts
const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const token: any = await fs.readFile(TOKEN_PATH).catch(() => getNewToken(auth));
auth.setCredentials(JSON.parse(token));

const sheets = google.sheets({ auth, version: "v4" });
const spreadsheetId = "spreadsheetId";

const gsheet = new GSheetQL(spreadsheetId, sheets, auth);

gsheet
  .get(["Users", "Messages"], true, [["ID", "Name", "Age"]])
  .then(res => console.log(res));

await gsheet
  .update("Users!A2:D4", ["ID", "Name", "Age"], null, true)
  .then(res => console.log("log", res));
```

### Usage

- `spreadsheetId` - ID of your sheet
- `sheets` - Your Google Sheet instance
- `auth` - Your authed Google Instance

### `.get`

```ts
.get(
    range: string | string[],
    batch?: boolean,
    fields?: any,
    asRaw?: boolean
    )
```

### `.update`

```ts
.update(
    range: string | string[],
    fields: string[],
    rows: any,
    batch?: boolean,
    )
```

### `.insert`

```ts
.insert(
    range: string,
    fields: string[],
    rows: {[key]: string, ...} ?[]
    )
```

## License

MIT
