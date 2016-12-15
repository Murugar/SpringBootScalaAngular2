"use strict";
var poll_list_component_1 = require("./poll.list.component");
var dashboard_component_1 = require("./dashboard.component");
exports.ROUTE = [
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'poll', component: poll_list_component_1.PollListComponent },
    { path: '', component: poll_list_component_1.PollListComponent }
];
//# sourceMappingURL=app.routes.js.map