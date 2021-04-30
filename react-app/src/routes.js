import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import CreateUser from "./User/create";
import { FunctionalList } from "./User/f-list";
import List from "./User/list";

const routes = [
    {
        path: '/user',
        component: CreateUser
    },
    {
        path: '/flist',
        component: List
    },
    {
        path: '/list',
        component: FunctionalList
    },
    {
        path: '*',
        component: FunctionalList
    },

]

export default function RouteConfig() {
    return (
        <Router>
            <Switch>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
        </Router>
    )
}

function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            component={route.component}
        // render={props => (
        //     // pass the sub-routes down to keep nesting
        //     <route.component {...props} routes={route.routes} />
        // )}
        />
    );
}