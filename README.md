#Would you rather

#Steps to build our project
- Create our project using ```npm creare-react-app
- Then install Redux using ```npm i redux react-redux
- after installing Redux, open index.js and import your ```createStore from 'redux'
    * create your Store
    * create new folder called ```reducers
        - inside this folder put new reducer
            |_ nake reducer file and init the global state
            |   |_ handle Globle state
            |   |_ function to import data from _DATA like ```didMount
            |
            |_ import reducer file to index.js
            |_ put it in the store initalization

    * Import Provider from react-redux in index.js to pass our Store to all the app
        - pass the store by attributes to the app
    * In app.js import ```{ connect } from react-redux
        - use it to relie app with Function mapStateToProps we just initialeized
    * Now we can make some ```Actions to control our project
        - in the file rootReducer.js :
            |_ nake if condition or switch to control state
            |_ in our case we use SAVE_ANSWER, SAVE_QUESTION, CREATE_QUESTION
        - Create folder called ```actions
            |_ initialeize Actions like objects
        - in the file we want the function to run
            |_ call the function mapDispatchToProps
            |_ pass actions to the function mapDispatchToProps
            |_ relie mapDispatchToProps with ```connect

#How to use this project
    * first colne it
    * second run ```npm i
    * then run ```npm start
    * finally enjoy the app