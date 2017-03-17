module.exports = (server) => {
  const Project = server.models.Project;
  const Team = server.models.Team;
  const Task = server.models.Task;
  const User = server.models.User;

  return {
    create,
    list,
  };

  function create(req, res, next) {
    let task = null;
    // retrieve user id
    return findUserAndCreateProject()
      .then(server.utils.ensureOne)
      .catch(server.utils.reject(403, 'no user'))
      .then(createTeam)
      .then(createProject)
      .then(res.commit)
      .catch(console.log(res.error));

    // return user id
    function findUserAndCreateProject() {
      return User.findById(req.user.id);
    }

    // create team
    function createTeam(user) {
      const users = [user];
      return new Team({ users })
        .save();
    }

    // create project

    function createProject(team) {
      return new Project({ team, title: req.body.title })
        .save();
    }
  }

  function list(req, res, next) {
    Project.find()
      .then(res.commit)
      .catch(res.error);
  }

  function remove(req, res, next) {
    Project.findByIdAndRemove(req.body.id, req.body)
      .then(server.utils.ensureOne)
      .catch(server.utils.reject(404, 'project not find'))
      .then(server.utils.empty)
      .then(res.commit)
      .catch(res.error)
  }
}
