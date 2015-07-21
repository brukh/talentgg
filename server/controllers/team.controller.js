var Team = require( '../models/team.model' );
var passport = require( 'passport' );

module.exports = {

  register: function( req, res, next ) {
    Team.create({
      teamName: req.body.teamName
    });
  },

  getProfile: function( req, res, next ){
    Team.findOne({where: {teamName: req.url.split('/')[3]}})
       .then(function (teamProfile) {
         res.json(teamProfile);
     });
   },

   getAllProfiles: function( req, res, next ){
    Team.findAll()
       .then(function (teamProfiles) {
         res.json(teamProfiles);
     });
   },

  updateProfile: function( req, res, next ){
    // change this to loop over keys
    Team.update( {
        activationKey: req.body.password
      }, {
        where: {
          username: req.body.username
        }
      });
  }

};

