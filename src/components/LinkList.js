import React, { Component } from "react";
import Link from "./Link";
import { Query } from "react-apollo";
import gql from "graphql-tag";

//stores query gql is a function used to parse the string
const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

class LinkList extends Component {
  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

          const linksToRender = data.feed.links;

          return (
            <div>
              {linksToRender.map((link) => (
                <Link key={link.id} link={link} />
              ))}
            </div>
          );
        }}
        {/* linksToRender is returned as from render prop function provided by the Query component */}
      </Query>
    );
  }
}

export default LinkList;
