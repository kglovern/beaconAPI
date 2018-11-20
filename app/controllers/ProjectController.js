const path = require('path');
const db = require(path.join(__model, 'database'));

module.exports = {
  /**
   * getProjectById: Retrieve data for a single project and return it as a JSON object
   * @param req:Request -> Request meta data
   * @param res:Response -> Response object
   * @param: params.id:Int -> ID corresponding to the project ID
   */
  getProjectById: async (req, res) => {
    try {
      const projectData = await db('Project')
        .select()
        .where('id', req.params.id)
        .first();
      if (projectData) {
        res.send(projectData);
      } else {
        res.status(403).send({
          err: 'Unable to retrieve project with id ' + req.params.id
        })
      }
    } catch (e) {
      console.log(e);
      res.status(503).send({
        err: 'Critical failure trying to retrieve project with id ' + req.params.id
      });
    }
  },
  /**
   * deleteProjectByID: Delete a specific project and all related information 
   * @param req:Request -> Request meta data
   * @param res:Response -> Response object
   * @param: params.id:Int -> ID corresponding to the project ID
   */
  deleteProjectById: async (req, res) => {
    try {
      const result = await db('Project')
        .delete()
        .where('id', req.params.id);
      console.log(result);
      res.status(200).send();
    } catch (e) {
      console.log(e);
      res.status(503).send({
        err: 'Critical failure while deleting project with id ' + req.params.id
      });
    };
  },
  /**
   * addEditorToProject: Associate a user with a project
   * @param req:Request -> Request meta data
   * @param res:Response -> Response object
   * @param params.id:Int -> ID corresponding to the project ID
   * @param body.userId:Int -> Id corresponding to the user to be added as editor
   */
  addEditorToProject: async (req, res) => {
    const projectId = req.params.id;
    const userId = req.body.userId;

    try {
      const editor = await db('ProjectEditor')
        .insert({
          project_id: projectId,
          user_id: userId,
        });
      res.send(editor);
    } catch (e) {
      console.log(e);
      res.status(503).send({
        err: 'Error adding editor to project'
      });
    }

  },
};