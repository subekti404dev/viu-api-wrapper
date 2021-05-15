# VIU Api Wrapper
simple api wrapper for VIU

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