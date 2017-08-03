# Redux React Simple App Template



This project template was build to provide example of backend middleware and frontend.


## Server Side Logic

### Terminology

### Data Flow

#### Directory structure:

```less
    server
        - config  
        - controllers
        - db
        - models
        - routes
        - schema
```

- model stores definition of app classes
- db defines database manager helper class
- contollers stores logic for CRUD (create, read, update, delete) operation with model objects. Note that create and update use just persist method
If record.id is defned persist would use update, otherwise it uses insert (create).
- routes defines routes betwen http method with matching URI and corresponding callback to routes to controller.
- schema stores definition of database schema


1. Define application model (classes used by the app)


**server/models/index.js**

```javascript 1.7

const UserGroup = class UserGroup {
    constructor( {id, name, email} ) {
        this.id = id;
        this.name = name;
    }
};


module.exports = {
    'User': User,
    'UserGroup':UserGroup,
};

```


2. Define controller for application models (DAO data access object)
With the following:
    - readAll
    - readById
    - persist
    - remove (


**server/controllers/user_group.js**


```javascript 1.8

const {UserGroup} = require('./../models/'); //load user class

module.exports = (manager) => { //note that db manager is being passed by the imported

    return {

        readAll: () => {
            return manager.selectAll("SELECT id, name FROM user_group", UserGroup)
        },

        readById: (id) =>  {
            return manager.selectAll("SELECT id, name FROM user_group WHERE id = ?", UserGroup, undefined, id);
        },

        persist:  (record) => {
            var self = this;
            return new Promise( (resolve, reject) => {
                let onSucess =  (record) => {
                    self.readById(record.id).then(resolve, reject);
                };
                manager.persist('user_group', record).then(onSucess, reject)

            });
        }
        
        
        remove: function (record) {
            return new Promise((resolve, reject) => {
                manager.remove('user_group', record).then(resolve, reject)
            });
        }
    }
};


```

3. Load model controller in the **server/controllers/index.js** to export it.
 



```javascript 1.8

//....

const user = require('./user')(manager);
const userGroup = require('./user_group')(manager);

//....

module.exports = {
    user: user,
    userGroup: userGroup,
    
    //....

    api: {
        'onSuccess':onSuccess,
        'onError':onError
    }
};
```

4. Update routes in **server/routes/api.js** 

    Create routes between http GET/POST and URI with respective controller methods.


```javascript 1.8

module.exports = (app) => {

    app.get('/api/user_group',  (httpRequest, httpResponse) => {
        controller.userGroup.readAll().then(onSuccess(httpResponse), onError(httpResponse));
    });

    app.get('/api/user_group/:id',(httpRequest, httpResponse) => {
        const id = httpRequest.param("id");
        controller.userGroup.readById(id).then(onSuccess(httpResponse), onError(httpResponse));
    });


    app.post('/api/user_group/', (httpRequest, httpResponse) => {
        controller.userGroup.persist(httpRequest.body).then(onSuccess(httpResponse), onError(httpResponse));
    });

    app.delete('/api/user_group/:id', (httpRequest, httpResponse) => {
        const id = parseInt(httpRequest.params["id"]);
        controller.userGroup.remove({'id':id}).then(onSuccess(httpResponse), onError(httpResponse));
    });

};
```


5. Update your database details in **/config/connection.js**



6. Add database schema definition of your database for referecne:

```sql

CREATE TABLE `user_group` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
);'


```


7. Test your API

- start server.js
- test with POSTMAN or wget (TODO provide more details)


## Client Side


#### Terminology

Store -> redux global associate array that store state of the application

Container -> react-redux component that synchronizes it state from redux store, and manages read and data modification operation.
Component ->  react component that implements portion of functionality delegated by Container, can be reusable.

Action -> an associative array the has to have type key describing action, and any other keys that may be used by reducers
    for instance {type:'INCREMENT'}

Reducer -> a function that takes (currentStoreState, action) as parameters to return new store state, 
    
    If combineReducers are used, associative array is used with key namespace to update only relevant portion of the store, for the given reducer.
    
    const rootReducer = combineReducers({
        user: UserReducer
        userGroup: UserGroupReducer
    });
  
Dispatch - a redux method to update redux store by passing action.
  
  

#### Data flow


##### Accessing redux store state in the react component

In order to access redux store the component class has to build
1 define a function that takes storeState as parameters and returns associative array of properties to the react component

```javascript 1.8

    function mapStateToProps(storeState) {
        return {
            message: storeState.message,
        }
    }
```
Note that even when combineReducers have been used, the root level store is passed in to mapStateToProps

   
2 Link react component with redux by using connection method
 
```javascript 1.8 
import {connect} from 'react-redux';
   
 ///....
 
class MyComponent extends Component {   

      render() {
         return ('Hello {this.props.message}')
      }
      
}

export default connect(mapStateToProps)(MyComponent)

``` 
 
3 Once component is linked it has access to dispatch method vi this.props.dispatch

   
##### Updating redux store state.

1. In order to update redux store state dispatch method needs to be called with action (associative array).

    For instance
```javascript 1.8       

    var updateMessageActionProvider = function(message) {
        return  {type:'MY_COMPONENT_UPDATE_MESSAGE', 'message':message} 
    }
     
    dispach( updateMessageActionProvider('Hello World') )
```

2. Dispatch will run all reducers to check if update store state has changed, if so then the new state will be applied to the redux store.
It is important to return current store state in case a reducer does match relevant action, otherwise new state needs to be created.

Note that when combineReducers are used, the reducer only can update subsection of the store under which key namespace it has been placed.


```javascript 1.8 
let MyComponentReducer () {
    return (state = {key:'default value'}, action) => {
        if(action.type === 'MY_COMPONENT_UPDATE_MESSAGE') {
            return {
                ...state,
                message: action.message
            }
        }
        return state
    }
}
```

#### Middlewear are the classes are intermediary (middleman) between REST API and redux store state synchroniztion.

    TODO provide more details about ApiAction
    

#### Directory structure:

```less
    src
        - actions  
        - components
        - containers
        - middlewear
        - reducers
```

- actions stores actios define per containers
- componenets store react components
- containers store react-redux data managing components
- middlewear stores rest api helper class to simplify request/response/error handling vi separate actions
- reducer stores redux reducers that are listening for specific action to update redux store state.

### Building Client Side Component

1. create 


## Deployment

- Building dependencies

Run the following script in command line

```less
yarn

```

- Building react-redux

```less
yarn
npm run-script build

```



- Starting servder

node server/index.js

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


