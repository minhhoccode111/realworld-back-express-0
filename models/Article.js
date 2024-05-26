const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const slugify = require("slugify");
const User = require("./User");

const articleSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },

    tagList: [
      {
        type: String,
      },
    ],

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    favouritesCount: {
      type: Number,
      default: 0,
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true, // automatic add createdAt and updatedAt
  },
);

// unique fields will be handled nicely
articleSchema.plugin(uniqueValidator);

// @desc create a slugified version of the document's title field
// and assign to slug field before a document is saved
articleSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true, replacement: "-" });
  next();
});

articleSchema.methods.updateFavoriteCount = async function () {
  const favoriteCount = await User.count({
    favouriteArticles: { $in: [this._id] },
  });

  this.favouritesCount = favoriteCount;

  return this.save();
};

// @desc user is the logged-in user
// NOTE: really big brain
articleSchema.methods.toArticleResponse = async function (user) {
  // first retrieve the author of the article
  const authorObj = await User.findById(this.author).exec();
  return {
    // extract some value from the document
    slug: this.slug,
    body: this.body,
    title: this.title,
    tagList: this.tagList,
    description: this.description,
    favoritesCount: this.favouritesCount,

    // these 2 existed because of timestamps: true
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,

    // identify if current user marked this article as favourite
    favorited: user ? user.isFavourite(this._id) : false,

    // the call the to profile method of author object to exclude token
    // and include connection between current user w/ article's author
    author: authorObj.toProfileJSON(user),
  };
};

articleSchema.methods.addComment = function (commentId) {
  if (this.comments.indexOf(commentId) === -1) {
    this.comments.push(commentId);
  }

  return this.save();
};

articleSchema.methods.removeComment = function (commentId) {
  if (this.comments.indexOf(commentId) !== -1) {
    this.comments.remove(commentId);
  }

  return this.save();
};

module.exports = mongoose.model("Article", articleSchema);
