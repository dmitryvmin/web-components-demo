### Web-Components demo
FE component demo that uses vanilla JS + web-components. Testing out how a reusable/composable component library might work without React/Vue/Angular dependencies.

### Commands

```
npm start - start developmenmt server
npm run build - build project bundle
```

### Web Component

Component displays a selectable results menu as user types in query. The component takes a controller for getting and using the data.

```
<typeahead-component
  label=''
  data-controller="STATIC"
/>
```

TODO: the data controller should be injected as a data-controller prop instead. Currently, the component just accepts a controller type and looks up + instantiates the controller internally.

### DataControllers

```
fn APIDataController()
fn StaticDataController()
```
The job of getting and formatting the data is abstracted out into APIData & StaticData controllers.

`APIDataController` accepts Fetch API parameters `fetch(input: RequestInfo, init?: RequestInit)` to query APIs.

