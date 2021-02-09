### Commands

```
npm start - start developmenmt server
npm run build - build project bundle
```

### Web Component

```
<typeahead-component 
  label='' 
  data-controller="STATIC"
/>
```

### DataControllers

```
fn APIDataController() 
fn StaticDataController()
```
The job of getting and formatting the data is abstracted out into APIData & StaticData controllers.

`APIDataController` accepts Fetch API parameters `fetch(input: RequestInfo, init?: RequestInit)` to query APIs. 

