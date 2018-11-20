const path = require('path');
const db = require(path.join(__model, 'database'));

module.exports = {
  /**
   * getProjectById: Retrieve data for a single project and return it as a JSON object
   * @param req:Request -> Request meta data
   * @param res:Response -> Response object
   * @param: params.id:Int -> ID corresponding to the project ID
   */
  getProjectByID: async (req, res) => {
    try {
      const projectData = await db('projects')
        .select()
        .where('id', req.params.id)
        .first();
      if (projectData) {
        res.send(projectData);
      }  else {
        res.status(403).send({ err: 'Unable to retrieve project with id ' + req.params.id })
      }
    } catch (e) {
      res.status(503).send({ err: 'Critical failure trying to retrieve project with id' + req.params.id });
    }
  }
};
