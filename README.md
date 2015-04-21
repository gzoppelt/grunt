##Essential AngularJS - Grunt Build
###Chapter 3 - Modular AngularJs
####commit:
####Summary
AngularJS: basic folder and module structure
```js
/example-app
    /src
        /app
            /login
                login.js:
                    routings	    \
                    controller(s)   |   specific for this module
                    services        |
                    directives      /

                login.spec.js
                login.tpl.html
            app.js

        /common

        index.html
```