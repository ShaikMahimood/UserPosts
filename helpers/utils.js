class Utils {
    //calculatePagesCount from page limit and totalCount
 calculatePagesCount(limit, totalCount) {
    return totalCount < limit ? 1 : Math.ceil(totalCount / limit);
};
}

module.exports = { Utils };