# Node Sample

This app is built with DDD in mind. This means we keep in mind that lower level items such as entities should never (or almost never) change. However, we can still update outer rings, such as the database, and that should not have an affect on the entities.

### Domain

The domain folder contains all of entities such as a User [find this entity here](https://github.com/dbizhev/Node-Sample/blob/master/src/domain/user/user.ts). Entities should have no imports (asside from the typing imports). Everything should be injected into the function, this allows us to update things such as hashing functions or id generation independent without having to change the entities. In our case we will import our Id and our hashing function from our utils folder and inject it into the User entity, [you can see that in the index file here](https://github.com/dbizhev/Node-Sample/blob/master/src/domain/user/index.ts). 

### Application (app for short)

The app folder contains all of the logic for actually creating entities, in our case [creating a new user](https://github.com/dbizhev/Node-Sample/blob/master/src/app/user/create.ts) or [validating a user signin](https://github.com/dbizhev/Node-Sample/blob/master/src/app/user/validate.ts). This level should only import the entities from our domain, the repositories which connect to the database should be injected into the functions, [you can see this in the index file here](https://github.com/dbizhev/Node-Sample/blob/master/src/app/user/index.ts).

In order to make the enviornment a little bit easier to work with I also have an application config in the app folder, this just maps our enviornment variables into an object which allows intellisense through our IDE. [This file can be found here](https://github.com/dbizhev/Node-Sample/blob/master/src/app/config.ts).

### Infrastructure (infra for short)

The infra folder is where we put all of our things such as databases and logging. For this example case the logger is just exporting the console, however, in a real use case this would be an actual logger. The main thing here for the example is the database, which in our case we are using mongodb. However, you can easily change this for any database you want and you will not need to change any of the lower level items from Domain, or App (this is why DDD is extremely nice). Since we only have one entity we only have one repository which holds information necessary to access the database, this is the [usersRepository found here](https://github.com/dbizhev/Node-Sample/blob/master/src/infra/database/repositories/usersRepository.ts). Here we import the Id utility, however, this should not necessairly be needed as the application layer should always generate the id. In this level we still inject the database, however, we are still depending on the specific database driver we are using so if you change out the database every function in this file would need to be modified unless you made a driver that converts from mongodb into the database of your choice.

### Interfaces

The interfaces folder is where all of our controllers and servers will be that connect to the outside world of your users directly. For our controllers in this example we have only one controller, the users controller which has 2 function, the [signin user](https://github.com/dbizhev/Node-Sample/blob/master/src/interfaces/http/controllers/users/signinUser.ts), and, the [signup user](https://github.com/dbizhev/Node-Sample/blob/master/src/interfaces/http/controllers/users/signupUser.ts). The controllers do not have an imports and rely on injections from the Application level and should only serve the purpose of connecting the application use cases and sending an output to the user. In this example we will inject the createUser application into the signupUser and the validateUser into the signinUser controllers, you can see this [here](https://github.com/dbizhev/Node-Sample/blob/master/src/interfaces/http/controllers/users/index.ts).

The last utlity function we have before we get to the actual server maps the expressCallback function into our own httpRequest which makes changing the framework we use, say from express to hapi, as easy as creating one utility function for the controllers. You can see this utility [here](https://github.com/dbizhev/Node-Sample/blob/master/src/interfaces/http/controllers/index.ts).

The very last file we have is the [server file](https://github.com/dbizhev/Node-Sample/blob/master/src/interfaces/http/server.ts). Here we finally import express and setup all the configuration we need here to start our server. To create the routes we will import our controllers, signup, and signin from the user controllers folder, and map it to the routes that we want them to be connected to.
