const { Users, UsersSchema } = require('./users.model');
const { Events, Events_Schema } = require('./events.model');
const { Comments, Comments_Schema } = require('./comments.model');
const { Enrollees, Enrollees_Schema } = require('./enrollees.model');
const { EventCovers, EventCovers_Schema } = require('./eventCovers.model');

function setupModels(sequelize) {
    Users.init(UsersSchema, Users.config(sequelize));
    Events.init(Events_Schema, Events.config(sequelize));
    Comments.init(Comments_Schema, Comments.config(sequelize));
    Enrollees.init(Enrollees_Schema, Enrollees.config(sequelize));
    EventCovers.init(EventCovers_Schema, EventCovers.config(sequelize));

    Comments.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });
    Users.hasMany(Comments, { foreignKey: 'user_id', as: 'comments' });
}

module.exports = setupModels;
