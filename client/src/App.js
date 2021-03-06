import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./components/routing/PrivateRoute";
// Screens
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <PrivateRoute exact path="/" component={PrivateScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route
            exact
            path="/forgot-password"
            component={ForgotPasswordScreen}
          />
          <Route
            exact
            path="/reset-password/:resetToken"
            component={ResetPasswordScreen}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
