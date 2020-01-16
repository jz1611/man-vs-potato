module.exports = {
  getBulkResults: async (req, res, next) => {
    const db = req.app.get('db');
    const uniqueRunners = await db.select_total_runners();
    const totalTimes = await db.select_total_times();
    const topMale = await db.select_top_gender('m');
    const topFemale = await db.select_top_gender('f');
    res.status(200).send([uniqueRunners[0].count, totalTimes[0].count, topMale[0], topFemale[0]]);
  },

  searchRunnersOrderByLastName: async (req, res, next) => {
    const db = req.app.get('db');
    let { first_name, last_name } = req.query;
    const foundRunners = await db.search_runners_by_last([first_name, last_name]);
    res.status(200).send(foundRunners);
  }
}