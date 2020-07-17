import React, { Component } from "react";
import Link from "./Link";
import { Query } from "react-apollo";
import gql from "graphql-tag";

//stores query gql is a function used to parse the string
export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

class LinkList extends Component {
  _updateCacheAfterVote = (store, createVote, linkId) => {
    //read curretn state of cached data
    const data = store.readQuery({ query: FEED_QUERY });
    //retrieve link user just voted for
    const votedLink = data.feed.links.find((link) => link.id === linkId);
    //reset votes to include new user vote
    votedLink.votes = createVote.link.votes;

    //write modified data back into the store
    store.writeQuery({ query: FEED_QUERY, data });
  };

  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

          const linksToRender = data.feed.links;

          return (
            <div>
              {linksToRender.map((link, index) => (
                <Link
                  key={link.id}
                  link={link}
                  index={index}
                  updateStoreAfterVote={this._updateCacheAfterVote}
                />
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
