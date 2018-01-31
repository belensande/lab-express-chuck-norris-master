![Ironhack Logo](https://i.imgur.com/1QgrNNw.png)

# PP | Express: Chuck Norris Jokes

## Learning Goals

After this learning unit, you will be able to:

- Create a basic web application using Express
- Add a static route to display content
- Get in touch for the first time with an API
- Create a request to the Chuck Norris API to retrieve content and display it

## Requirements

- [Fork this repo](https://guides.github.com/activities/forking/)
- Clone this repo into your `~/code/labs`

## Submission

Upon completion, run the following commands
```
$ git add .
$ git commit -m "done"
$ git push origin master
```
Navigate to your repo and create a Pull Request -from your master branch to the original repository master branch.

In the Pull request name, add your name and last names separated by a dash "-"

## Deliverables

Please, push every file needed to make your app properly on GitHub before creating the pull request.

## Introduction

[Chuck Norris](https://en.wikipedia.org/wiki/Chuck_Norris) is a famous actor and martial artist that starred in many American movies in the '80s and '90s.

![Chuck Norris Picture](https://i.imgur.com/hAmRT5L.jpg)

After his film career died off, the *people of the internet* turned him into a living meme. [Chuck Norris Facts](https://en.wikipedia.org/wiki/Chuck_Norris_facts) quickly became all the rage. These "facts" are just hyperbolic jokes on the skills of Chuck Norris.

> Chuck Norris counted to infinity... twice

> Chuck Norris can put out a fire... with gasoline

> Michael Jackson can moonwalk but Chuck Norris can sun walk

Today, we will be building a Chuck Norris joke finder using Express.

## Setting up a new project

Once you fork this repo, remember to initialize a new project

```
$ npm init
```
Type `enter` to approve default settings.

Install `express` into your project and `ejs` to use views. Remember to tell your Express app that EJS will be in charge of rendering the HTML and specify the path where the views will be available.

At the end of the exercise you should have at least four routes:

- `/`- The homepage with a description and links to the other pages
- `/random`- To display a random joke
- `/categories` - To display a joke by category
- `/search` - To search for a joke by keyword (so it will have to display a form to be filled by the user)


## Iteration 1 - Get a random joke

To retrieve data from the API, we need to install a package: [chucknorris-io](https://www.npmjs.com/package/chucknorris-io):

```
$ npm install --save chucknorris-io
```

Remember you need to require the package once installed. In this case it will be:

```javascript
const Chuck    = require('chucknorris-io');
const client   = new Chuck();
```

Create a route using Express for the `/random` Web address. When a user visits http://localhost:3000/random, the application should request a random joke using the `chucknorris-io` package and show it in a `p` tag.

The package has a `getRandomJoke()` method that you should use here:

```javascript
// Retrieve a random chuck joke
client.getRandomJoke()
  .then((response) => {
    // use the response here
  }).catch((err) => {
    // handle error
  });
```


## Iteration 2 - Get a joke by category

### The Categories List

To be able to filter our jokes by category, first we need to display the available categories.

Create a new route `/categories` in your Express application. When a user visits http://localhost:3000/categories, the application should show the full list of joke categories.

The [chucknorris-io](https://www.npmjs.com/package/chucknorris-io) package offers a method to retrieve the available categories:

```javascript
client.getJokeCategories()
  .then((response)=>  {
    // use the response here
  })
  .catch((err)=> {
    // handle error
  });
```


:bulb: When your app requests the list of categories to the Chuck Norris API, the response will be an array. Prepare the data to show it in the view by sending as a view local with `res.render()`.


Each category should be a link. When a user clicks one of them, they should be sent to the category page. For example:

- If the user clicks on `dev`, they should be taken to http://localhost:3000/categories?cat=dev
- If the user clicks on `sport`, they should be taken to http://localhost:3000/categories?cat=sport

Set the `href` of your anchor tags to match that.

### The URL with the new joke

In your `app.js`, create a new route with the name of the selected category as a parameter in the Web address (remember the `params`).

Use this parameter to make the request to the API using the `getRandomJoke()` method provided by the [chucknorris-io](https://www.npmjs.com/package/chucknorris-io) package. The method can receive the name of a category as an argument.

```javascript
// Retrieve a random chuck joke
client.getRandomJoke('dev')
  .then((response) => {
    // use the response here
  }).catch((err) => {
    // handle error
  });
```

Display the result in the view `joke-by-category.ejs`.


## Iteration 3 - Get a joke by keyword

### The Form

Users will need a field to enter the keyword that your application will use to request the joke.

Create a new get route `/search` in your Express application. Once the user goes to http://localhost:3000/search, the application should display a form.

Create a new view `search-form.ejs` with the form HTML. Add a `post` action and send it to the same route `/search`.

The form should have one input for the search term and a submit button.

Create a new post route `/search` to capture the data sent from the form. In this route, let's perform the search using the [chucknorris-io](https://www.npmjs.com/package/chucknorris-io) package.

```javascript
client.search(searchTerm)
  .then(function (response) {
    // to stuff here
  }).catch(function (err) {
    // handle error
  });
```
### Rendering the result

Use the same route to render your result.


### Iteration 4 - Home page

Add a home page route with a heading and a description of the app. Include `<a>` tags to link to the different pages the app.


## Extra Resources

- [Express Routing](https://expressjs.com/en/guide/routing.html)
- [chucknorris-io](https://www.npmjs.com/package/chucknorris-io)
