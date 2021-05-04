import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { CreateUser } from "./classUser/create";
import { ClassList } from "./classUser/list";
import FunctionalList from "./functionUser/f-list";

const routes = [
    {
        path: '/add',
        component: CreateUser
    },
    {
        path: '/edit/:id',
        component: CreateUser
    },
    {
        path: '/flist',
        component: FunctionalList
    },
    {
        path: '/list',
        component: ClassList
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