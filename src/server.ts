// import { MikroORM, LoadStrategy } from "@mikro-orm/sqlite"; // or any other driver package
// import { User } from "./modules/user/user.entity.js";
// import { Article } from "./modules/article/article.entity.js";
// import { Tag } from "./modules/article/tag.entity.js";

import { bootstrap } from "./app.js";

try {
  const { url } = await bootstrap();
  console.log(`server started at ${url}`);
} catch (e) {
  console.error(e);
}

// initialize the ORM, loading the config file dynamically
// const orm = await MikroORM.init();

// // recreate the database schema
// await orm.schema.refreshDatabase();

// // create new user entity instance

// const user = new User("Foo Bar", "foo@bar.com", "123456");
// console.log(user);

// const em = orm.em.fork();

// // first mark the entity with `persist()`, then `flush()`
// await em.persist(user).flush();

// em.clear();

// // create the article instance
// const article = em.create(Article, {
//   title: "Foo is Bar",
//   text: "Lorem impsum dolor sit amet",
//   author: user.id,
// });

// await em.persist(article).flush();

// // clear the context to simulate fresh request
// em.clear();

// // find article by id and populate its author
// const articleWithAuthor = await em.findOne(Article, article.id, {
//   populate: ["author", "text"],
//   strategy: LoadStrategy.JOINED,
// });
// console.log(articleWithAuthor);

// {
//   // clear the context to simulate fresh request
//   em.clear();

//   // populating User.articles collection
//   const user = await em.findOneOrFail(User, 1, { populate: ["articles"] });
//   console.log(user);

//   // or you could lazy load the collection later via `init()` method
//   if (!user.articles.isInitialized()) {
//     await user.articles.init();
//   }

//   // to ensure collection is loaded (but do nothing if it already is), use `loadItems()` method
//   await user.articles.loadItems();

//   for (const article of user.articles) {
//     console.log(article.title);
//     console.log(article.author.fullName); // the `article.author` is linked automatically thanks to the Identity Map
//   }

//   // create some tags and assign them to the first article
//   const [article] = user.articles;
//   const newTag = em.create(Tag, { name: "new" });
//   const oldTag = em.create(Tag, { name: "old" });
//   article.tags.add(newTag, oldTag);
//   await em.flush();
//   console.log(article.tags);

//   // to remove items from collection, we first need to initialize it, we can use `init()`, `loadItems()` or `em.populate()`
//   await em.populate(article, ["tags"]);

//   // remove 'old' tag by reference
//   article.tags.remove(oldTag);

//   // or via callback
//   // article.tags.remove(t => t.id === oldTag.id);

//   await em.flush();
// }

// // close the ORM, otherwise the process would keep going indefinitely
// await orm.close();
