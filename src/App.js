import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

import { Chat } from "./admin/pages/Chat";
import Dashboard from "./admin/pages/Dashboard";
import QuestionManagement from "./admin/pages/QuestionManagement";
import Users from "./admin/pages/Users";
import Layout from "./shared/components/Layout/Layout";
import { LoadingDot } from "./shared/components/LoadingDot/LoadingDot";
import { Roles } from "./shared/roles/roles";
import ChangePassword from "./student/pages/ChangePassword";
import { QuestionDetail } from "./student/pages/QuestionDetail";

const Login = React.lazy(() => import("./student/pages/Login"));
const Ebox = React.lazy(() => import("./student/pages/Ebox"));
const PageNotFound = React.lazy(() => import("./student/pages/PageNotFound"));
const ViewQuestions = React.lazy(() => import("./student/pages/ViewQuestions"));
const AddUser = React.lazy(() => import("./admin/pages/AddUser"));

function App() {
  const location = useLocation();
  const { isInAdminMode } = useSelector((state) => state.ui);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered min-h-screen">
            <LoadingDot className="fixed z-50" />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/E-boxVLU" />
          </Route>
          <Route path="/E-boxVLU" exact>
            <Ebox />
          </Route>
          <Route path="/E-boxVLU/login" exact>
            <Login />
          </Route>
          <Route path="/E-boxVLU/notExist" exact>
            <PageNotFound />
          </Route>

          {/* Logged in access */}
          <LoggedInRoute path="/E-boxVLU/Home" exact>
            <ViewQuestions />
          </LoggedInRoute>
          <LoggedInRoute path="/E-boxVLU/Home/question/:questionId">
            <QuestionDetail />
          </LoggedInRoute>
          <LoggedInRoute path="/E-boxVLU/change-password" exact>
            <ChangePassword />
          </LoggedInRoute>

          {/* Admin access */}
          {isInAdminMode && (
            <>
              <AdminRoute path="/E-boxVLU/admin/dashboard" exact>
                <Dashboard />
              </AdminRoute>
              <AdminRoute path="/E-boxVLU/admin/users" exact>
                <Users />
              </AdminRoute>
              <AdminRoute path="/E-boxVLU/admin/users/add" exact>
                <AddUser />
              </AdminRoute>
              <AdminRoute path="/E-boxVLU/admin/questions" exact>
                <QuestionManagement />
              </AdminRoute>
              <AdminRoute path="/E-boxVLU/admin/chat" exact>
                <Chat />
              </AdminRoute>
            </>
          )}

          {/* Random path */}
          <Route path="*">
            <Redirect to="/E-boxVLU/notExist" />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}
export default App;

function LoggedInRoute({ children, ...rest }) {
  const { account } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        account.role_name ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/E-boxVLU/notExist",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
function AdminRoute({ children, ...rest }) {
  const { account } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        account.role_name !== Roles.student ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/E-boxVLU/notExist",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
