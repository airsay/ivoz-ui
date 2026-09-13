import React from 'react';
import { UNSAFE_RouteContext, useMatch } from 'react-router-dom';
const useCurrentPathMatch = function () {
    const { matches } = React.useContext(UNSAFE_RouteContext);
    const routeMatch = matches[matches.length - 1];
    return useMatch(routeMatch.route.path);
};
export default useCurrentPathMatch;
