[![view on npm](http://img.shields.io/npm/v/viu-api-wrapper.svg)](https://www.npmjs.org/package/viu-api-wrapper)
[![npm module downloads per month](http://img.shields.io/npm/dm/viu-api-wrapper.svg)](https://www.npmjs.org/package/viu-api-wrapper)
# VIU Api Wrapper
simple api wrapper for VIU

## How to Install
```bash
npm install viu-api-wrapper
# or
yarn add viu-api-wrapper
```

## How to Use
```typescript
import {Home, Search, Detail, HLS} from 'viu-api-wrapper';

// get home data
const home = await Home.getData();

// get search data
const search = await Search.getData(keyword);

// get detail data
const detail = await Detail.getData(id);

// get playurl
const playData = await HLS.getPlayUrl(id);
```