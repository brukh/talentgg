var React = require('react');
var axios = require('axios');

var FindTeams = React.createClass({
  getInitialState: function() {
    return {
      users: [],
      me: {},
      filters: []
    };
  },
  componentDidMount: function() {
    var context = this;

    function getThem() {
        return axios.get('/user/all');
    }

    function getMe() {
        return axios.get('/profile');
    }

    axios.all([getThem(), getMe()])
        .then(axios.spread(function(them, me) { 
            console.log("-------");
            console.log(them.data);        
            context.setState({
              users: them.data,
              me: me.data.ratings,              
            });
        }));
  },     

  handleSubmit: function(e) {

  },
  render: function() {
    return (      
      <div className="findTeams">
        <p> I WORK! </p>

        <h1> Matches </h1>
        <MatchList users={this.state.users} me={this.state.me} />    
      </div>
      );
  }
});

module.exports = FindTeams

var MatchList = React.createClass({  
  render: function() {
    var calculateMatchScore =  function(pos, n) {
      var z, phat;      
      z = 1.96;
      phat = 1 * pos / n;
      return (phat + z*z/(2*n) - z * Math.sqrt((phat*(1-phat)+z*z/(4*n))/n))/(1+z*z/n); 
    };
    var MatchNodes = [];
    var overallScore = 0;
    console.log("xxxxxxxx")
    console.log(this.props.users)
    console.log("xxxxxxxx")
    for (var i = 0; i < this.props.users.length; i++){
      for (key in this.props.me) {
        var score = 20 - Math.abs(this.props.me[key] - this.props.users[i][key]);
        overallScore += score;
        score = calculateMatchScore(score, 20);        
      };
      overallScore = Math.round(calculateMatchScore(overallScore, 200) * 100);
      MatchNodes.push(
        <div>
          <div> <img src={ this.props.users[i].avatar } /> </div>
          <div> { this.props.users[i].displayName } </div>
          <div> { this.props.users[i].bio.willdo } </div>
          <div> { this.props.users[i].bio.purpose } </div>    
          <div> { this.props.users[i].bio.times } </div>
          <div> {overallScore}% </div>
          <br />
          <br />
        </div>)
    }



    return (
      <div>
        <ul className="MatchList">
          {MatchNodes}
        </ul>          
      </div>
    );
  }
});




