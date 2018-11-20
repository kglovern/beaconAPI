const path = require('path');
const db = require(path.join(__model, 'database'));


module.exports = {
  /**  Get all projects in which a user has editor privileges for 
   *  @param req:Request -> Request meta data
   *  @param res:Response -> Response object
   *  @param id:Int -> user.id join ProjectEditor.user_id
   */
  getUserProjects: async (req, res) => {
    try {
      const projects = await db('Projects')
        .select()
        .leftJoin('Project', 'Project.id', '')
        .where('ProjectEditor.user_id', req.params.id);
    } catch (e) {
      res.status(503).send({ err: 'Fatal error retrieving project list for user with id ' + req.params.id });
    }
    res.send('Got id ' + req.params.id);
  }
}
