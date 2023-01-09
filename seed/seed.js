const { getUsers } = require("../controller/user");
const { insertPosts } = require("../controller/posts");

const post = [
  {
    title: "tresure island",
    description:
      "Treasure Island is the story of a boy who sails on a ship searching for treasure",
  },

  {
    title: "The adventure of tom sawyer",
    description:
      "Tom Sawyer is a troublemaking little boy who is always causing problems, having fun and enjoying many crazy adventures",
  },

  {
    title: "The Story of Doctor Dolittle",
    description:
      "Doctor Dolittle loves animals. He loves them so much that when his many pets scare away his human patients, he learns how to talk to animals and becomes a veterinarian instead",
  },
  {
    title: " The Secret Garden",
    description:
      "The Secret Garden is a touching story about the power of friendship",
  },

  {
    title: "The Picture of Dorian Gray",
    description:
      "Dorian Gray makes a deal to stay young forever—while a painted portrait of him shows all the signs of aging",
  },
];

async function getUserId() {
  const users = await getUsers();
  const userId = [];
  users.map((user) => {
    if (!userId.includes(user._id)) userId.push(user._id);
  });
  return userId;
}

async function seedData() {
  const users = await getUserId();
  for (i = 0; i < users.length; i++) {

    for (j = 0; j < post.length; j++) {
      post[j]["userId"] = users[i];
    }
    await insertPosts(post[i]);
  }
}

seedData();