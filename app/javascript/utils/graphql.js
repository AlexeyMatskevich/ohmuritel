'use strict'
export function loadMore (fetchMore, data, path) {
  fetchMore({
    variables: { cursor: data[path].pageInfo.endCursor },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      const newEdges = fetchMoreResult[path].edges
      const pageInfo = fetchMoreResult[path].pageInfo

      return newEdges.length
        ? {
          [path]: {
            __typename: previousResult[path].__typename,
            edges: [...previousResult[path].edges, ...newEdges],
            pageInfo
          }
        }
        : previousResult
    }
  })
}
