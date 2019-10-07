# Toggl-Client

Client for the Toggl API built for async and await support

## Usage

```bash
npm i toggl-client
```

```js
const togglClient = require('toggl-client');

const client = togglClient({ apiToken: YOUR_API_TOKEN });
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [TogglClient](#togglclient)
-   [Clients](#clients)
-   [Groups](#groups)
-   [ProjectUsers](#projectusers)
-   [Projects](#projects)
-   [Tags](#tags)
-   [TimeEntries](#timeentries)
-   [Workspaces](#workspaces)

### TogglClient

Main class to interact with the toggl API.
Calling `togglClient({ apiToken: YOUR_API_TOKEN });` returns an instance of this class.

#### Properties

-   `workspaces` **[Workspaces](#workspaces)** 
-   `projects` **[Projects](#projects)** 
-   `timeEntries` **[TimeEntries](#timeentries)** 
-   `clients` **[Clients](#clients)** 
-   `groups` **[Groups](#groups)** 
-   `tags` **[Tags](#tags)** 
-   `projectUsers` **[ProjectUsers](#projectusers)** 

### Clients

Access clients. See <https://github.com/toggl/toggl_api_docs/blob/master/chapters/clients.md>

#### list

Gets a list of clients

Returns **any** an array of clients

#### create

Creates a new client

##### Parameters

-   `client` **any** 

Returns **any** Created client

#### get

Gets a client by id

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** 

Returns **any** client or undefined if no client with specified id was found

#### update

Updates a client

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** 
-   `client`  

Returns **any** updated client

#### delete

Deletes a client by id

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** 

#### projects

Lists projects associated with the given client

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** 
-   `active`  
-   `String`  active filter active clients by specifying true/false/both

### Groups

Access groups. See <https://github.com/toggl/toggl_api_docs/blob/master/chapters/groups.md>

#### create

Creates a group

##### Parameters

-   `group` **any** 

Returns **any** group created

#### update

Updates a group

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** group id that should be updated
-   `group` **any** 

Returns **any** result of update operation

#### delete

Deletes a group

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** group id that should be deleted

### ProjectUsers

Access project users. See <https://github.com/toggl/toggl_api_docs/blob/master/chapters/project_users.md>

#### get

Gets a project user by id

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** 

#### update

Updates an existing project user

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** Id of the project user to update
-   `project_user` **any** 

#### delete

Deletes an existing project user

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** 

#### create

Creates a new project user

##### Parameters

-   `project_user` **any** 

Returns **any** project user created

### Projects

Access projects. See <https://github.com/toggl/toggl_api_docs/blob/master/chapters/projects.md>

#### create

Creates a new project

##### Parameters

-   `project` **any** 

Returns **any** Project created

#### get

Gets an existing project by id

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** Id of the project to get

Returns **any** Project if a project with the specified id exists, othererwise undefined

#### update

Updates an existing project

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** Id of the project to be updated
-   `project` **any** 

Returns **any** The updated project

#### delete

Deletes an existing project

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** Id of the project to be deleted

#### users

Gets users associated with the given project

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** Id of the project

Returns **any** Array of users associated with the project

#### tasks

Gets tasks associated with the given project

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** Id of the project

Returns **any** Array of tasks associated with the project

### Tags

Access Tasgs. See <https://github.com/toggl/toggl_api_docs/blob/master/chapters/tags.md>

#### create

Creates a new tag

##### Parameters

-   `tag` **any** 

Returns **any** Tag created

#### update

Updates an existing tag

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** Id of the tag to be updated
-   `tag` **any** 

Returns **any** Updated tag

#### delete

Deletes an existing tag

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** If of the tag to be deleted

### TimeEntries

Access time entries. See <https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md>

#### list

Lists time entries

##### Parameters

-   `query` **any** 

Returns **any** List of time entries

#### create

Creates a new time entry

##### Parameters

-   `time_entry` **any** 

Returns **any** 

### Workspaces

Access workspaces. See <https://github.com/toggl/toggl_api_docs/blob/master/chapters/workspaces.md>

#### list

Lists all workspaces

Returns **any** List of workspaces

#### get

Gets a workspace by id

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** if of the workspace

Returns **any** Workspace or undefined if the given workspace does not exist

#### update

Updates an existing workspace

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** Id of the workspace to be updated
-   `workspace` **any** 

Returns **any** The updated workspace

#### users

Gets a list of users associated with the workspace

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** Id of the workspace

Returns **any** List of users associated with the workspace

#### clients

Gets a list of clients associated with the workspace

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** Id of the workspace

Returns **any** List of clients associated with the workspace

#### groups

Gets a list of groups associated with the workspace

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** Id of the workspace

Returns **any** List of groups associated with the workspace

#### projects

Gets a list of projects associated with the workspace

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** Id of the workspace

Returns **any** List of projects associated with the workspace

#### tasks

Gets a list of tasks associated with the workspace

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** Id of the workspace

Returns **any** List of tasks associated with the workspace

#### tags

Gets a list of tags associated with the workspace

##### Parameters

-   `id` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** Id of the workspace

Returns **any** List of tags associated with the workspace
