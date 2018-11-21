const path = require('path');
const db = require(path.join(__model, 'database'));

module.exports = {
  /**
   * createProject: Create a new project from form data
   * @param req:Request -> Request meta data
   * @param res:Response -> Response object
   */
  createProject: async (req, res) => {
    const userId = req.body.user_id;
    try {
      let project = await db('Project')
        .insert({
          owner_id: userId,
          name: req.body.name,
          width: req.body.width,
          height: req.body.height,
          is_active: true,
        });
      const projectId = project;
      // Associate user with project as editor
      const editor = await db('ProjectEditor')
        .insert({
          user_id: userId,
          project_id: projectId
        });
      // Now query and return the new project so meta data is available to the user.  Wow this is expensive.
      project = await db('Project')
        .select()
        .where('id', projectId);
      res.send(project);
    } catch (e) {
      console.log(e);
      res.status(500).send('')
    }
  },
  /**
   * updateProjectById: patch an existing project from form data
   * @param req:Request -> Request meta data
   * @param res:Response -> Response object
   * @param: params.id:Int -> ID corresponding to the project ID
   */
  updateProjectById: async (req, res) => {
    const projectId = req.params.id;
  },
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
      res.status(500).send({
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
      res.status(500).send({
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
      res.status(500).send({
        err: 'Error adding editor to project'
      });
    }
  },
  /**
   * @param req:Request -> Request meta data
   * @param res:Response -> Response object
   * @param params.id:Int -> ID corresponding to the project ID
   * @param params.editorId:Int -> Id corresponding to the user to be removed as editor
   */
  removeEditorFromProject: async (req, res) => {
    try {
      const result = await db('ProjectEditor')
        .delete()
        .where('user_id', req.params.editorId)
        .andWhere('project_id', req.params.id);
      res.status(200).send();
    } catch (e) {
      console.log(e);
      res.status(500).send({
        err: 'Unable to remove editor with id ' + req.params.editorId + ' from project'
      });
    }
  }
};