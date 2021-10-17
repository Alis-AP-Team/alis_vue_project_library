export default
{
  name: 'routingHandler',

  methods:
  {
    //routeToView pushes to the routeName.
    //It keeps the state query by default,
    //currently productTeam as the team={team}
    //key-value pair. This may be removed by specifying
    //keepStateQuery = false.
    //
    //Takes an optional updatedQuery field which pushes
    //a query object of key value pairs to the route.
    // Eg. {team: "organisations/alis/products/in"}
    //If keepStateQuery = true, the updatedQuery is amended
    //to the existing state driven query.
    //If keepStateQuery = false, the updatedQuery replaces
    //the existing state driven query.
    routeToView(routeName, params = null, keepStateQuery = true, updatedQuery = null)
    {
      return {
        name: routeName,
        params,
        query: Object.assign({}, keepStateQuery ? this.$router.currentRoute.query : {}, updatedQuery)
      };
    },
  }
};
