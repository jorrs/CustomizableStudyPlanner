import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StudyPlanList from './StudyPlanList';
import StudyPlanDetail from './StudyPlanDetail';
import AddStudyPlan from './AddStudyPlan';
import GoalTracker from './GoalTracker';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={StudyPlanList} />
            <Route path="/study-plan/:id" component={StudyPlanDetail} />
            <Route path="/add-study-plan" component={AddStudyPlan} />
            <Route path="/goal-tracker" component={GoalTracker} />
            <Route path="*" component={() => <h2>404 Not Found</h2>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;