# ![RealWorld Example App](logo.png)

> ### Express.js + MongoDB + JavaScript codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

### [Demo](https://demo.realworld.io/)

### [RealWorld](https://github.com/gothinkster/realworld)

This codebase was created to demonstrate a fully fledged fullstack application built with **Express.js + MongoDB + JavaScript** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **Express.js + MongoDB + JavaScript** community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

# Getting started

1. install npm
1. Run `npm install` in the project folder
1. Run `npm run dev` for dev mode and `npm run start` for regualr mode

# How it works

> All the routes are defined in the `src/routes` folder, and their corresponding controllers are implemented in the `src/controllers` folder.

# Design Choices and Tradeoffs

- Only one `access_token_secret` is used for all the accounts registration and login. Drawback: data can be forged if this secret is leaked
- Included array structures, e.g. list of comments in the article model, favorited articles in the user model, following users in the user model, tags in article model. Drawback: not good for scalability
- Count favorite times of an article by going through every user and count each time that article appear in `favoriteArticles` array of each user instead of maintaining a `favoritesCount` variable in each article document. Drawback: not good for scalability
- Usernames are case-sensitive

# Things I find that need to be updated

- Consistency variable name: `favorite` and `favourite`
- Add check for special article's slug named `feed` (make `GET /:slug` conflict with `GET /feed`)
- Add `.exec()` to the `articleCount`
- Change `.count()` to `.countDocuments()` in
  - `GET /articles/feed`
  - `GET /articles`
- Add handle Schema conflict `slug` by changing `await Schema.create()` to `await new Schema().save((err)=>{/* handle conflict slug */})`
- Remove not use `Tag` model
- Add check for valid MongoDB id and return soon with `isValidObjectId` (MongoDB throw if `findById` with invalid `id`)
- Add `Promise.all()` to improve performant in
  - `GET /articles/feed`
  - `DELETE /articles/:slug/comments/:id`
- Add check existence
  - article when trying to `PUT /api/articles/:slug`
  - comment when trying to `DELETE /articles/:slug/comments/:id`
