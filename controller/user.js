const Users = require("../model/user");
const { aggr } = require('../db/db')
function insertUsers(params) {
  const users = new Users(params);
  users.save((err, res) => {
    if (!err) console.log(res);
    else return err;
  });
}

function getUsers() {
  return new Promise(async (resolve, reject) => {
    await Users.find()
      .then((users) => {
        resolve(users);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function getUserPosts(req, res) {
  try {
    const page = parseInt(req.query.page),limit = parseInt(req.query.limit);

    const result = await Users.aggregate([
      {
        $facet: {
          users: [
            {
              $lookup: {
                from: "posts",
                localField: "_id",
                foreignField: "userId",
                pipeline: [{ $count: "count" }],
                as: "posts",
              },
            },
            {
              $addFields: {
                posts: { $sum: "$posts.count" },
              },
            },
            { $sort: { _id: 1 } },
            {
              $skip: (page - 1) * limit,
            },
            {
              $limit: limit,
            },
          ],
          pagination:[
            {
              $count:'totalDocs'
            }
          ]
        },
      },
    ]);
    if(!result.length) throw 'Users Data Not Found!';
    const totalDocs =result[0].pagination[0].totalDocs;
    const users = result[0].users;
    const pagination = {
      totalDocs,
      limit,
      page,
      totalPages: totalDocs/limit ,
      pagingCounter: (page - 1) * limit + 1,
      hasPrevPage: page - 1 ? true : false,
      hasNextPage: page - limit ? true : false,
      prevPage: page - 1 ? page - 1 : null,
      nextPage: page - limit ? page + 1 : null,
    }
    const response = { users, pagination};
    res.status(200).json({ status: "Success", data: response });
  } catch (error) {
    res.status(400).json({ status: "Error :", error: error });
  }
}

module.exports = { insertUsers, getUsers, getUserPosts };
