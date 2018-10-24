# brocal
Overview: 
Simple application using the following frameworks: HTML, CSS (Materialize), JS and MySQL database for the front end. In regards to the back end, the application uses Node.js (and node modules), Express.js and Express-handlebars. The Node modules used were the following: authentication – Passport.js. In addition, we used ORM – Sequelize and finally, we used several API’s, which are the following: Nutritionix, myfitnesspal, GET/READ/POST/DELETE. 

App Details:
BroCal is a fitness application, sampled from Fitness Pal, that allows users to input specific information in regards to their weight loss/gain goals. 
The participant creates an account with a username, email and password. Once the account has been created and the user is set to “active”, they are redirected to various pages that allow the user to input calorie intake, weight, food and alcohol tracker content for weekly, monthly and annual timeframes.

Setup Instructions: 
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

Directory:

config
-passport
	- passport.js
config.json

db
- alerts-seed.sql
- schema.sql
- seeds.sql

models
- alert.js
- booze.js
- food.js
- index.js
- user.js
- weight.js

public
- assets
	- css
		- footer.css
		- global.css
		- searchFood.css
		- weightModal.css	
	- js
		- bak.food.js
		- booze.js
		- datetime.js
		- food.js
		- global.js
		- jquery.tabledit.js
		- profile.js
		- search.js
		- searchswft.js
		- view.js
		- weight.js
	- materialize
		- css
			- materialize.min.css
			- materialize.min.js
		- js
		- .DS_Store
- public
	- examples
		- example-index.html
- examples
- .DS_Store

routes
 - alert.routes.js
 - booze.routes.js
 - food.routes.js
 - html-routes.js
 - profile-routes.js
 - weight-routes.js
 
 views
 - layouts
 	- login-layout.handlebars
	- main.handlebars
 - alcohol.handlebars
 - food.handlebars
 - index.handlebars
 - login.handlebars
 - profile.handlebars
 - signup.handlebars
 - weight.handlebars

- .DS_Store
- .gitignore
- LICENSE
- README.md
- package-lock.json
- package.json
- server.js


