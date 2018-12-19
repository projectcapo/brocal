# brocal v2
 ## Overview: 
 - Simple application using the following frameworks: HTML, CSS (Materialize), JS and MySQL database for the front end. 
 - The application uses Node.js (and node modules), Express.js and Express-handlebars. The Node modules used were the following: authentication – Passport.js. In addition, we used ORM – Sequelize and finally, we used several API’s, which are the following: Nutritionix, myfitnesspal, GET/READ/POST/DELETE. 
- - -
## App Details:
- BroCal is a fitness application that allows users to input and track information such as weight, food, fitness, etc. 
- User will be able to register an account login with username and password.

- - -
## App Functionality Overview 
Account creation (POST – Database)
    a.	Email
    b.	Name
    c.	Password
User Login (POST – Database – Authorization)
    a.	User information – Create profile
      i.	First login – POST – Database
Attributes (age, height, weight, sex, weight goals)
    b.	User information – Active user
      i.	Login – (POST – Database – Session Logging/ User Authentication)
Homepage – dashboard display
    a.	Graphs
      i.	Calorie intake – daily/weekly
      ii.	Goal weight – progress based on weekly/monthly/annually
      iii.	Food/alcohol info
   b.	Menu bar – bottom
      i.	Dashboard – button
      ii.	Track – food/alcohol
      iii.	Forms – modal
Food
   a.	Food name
   b.	Servings
   c.	Meal category
   d.	Calories
Alcohol
  a.	Alcohol name
  b.	Servings
  c.	Alcohol category
  d.	Calories
    iv.	Track – weight
1.	Forms – modal
   a.	Current weight
   b.	Feels 
    c.	Preferences (placeholders until app works)
2.	Menu bar – top
    a.	App name
    b.	Profile information
    c.	Alerts – notifications

- - -
### Minimum Requirements

Current versions of

|Tech | Runtime |
|-----|-----|
|OS | Linux or Mac|
|Languanges | NodeJS|
|Database | MySQL|

- - -
### Instructions

1. Clone the repo.
2. From the newly cloned BroCal directory, install required dependencies
3. Start node app.
4. Open your browser and go to: *http://localhost:3000/*
