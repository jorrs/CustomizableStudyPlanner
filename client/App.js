import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StudyPlanListPage from './StudyPlanList';
import StudyPlanDetailPage from './StudyPlanDetail';
import AddStudyPlanPage from './AddStudyPlan';
import GoalTrackerPage from './GoalTracker';

class StudyPlannerApp extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={StudyPlanListPage} />
            <Route path="/study-plan/:id" component={StudyPlanDetailPage} />
            <Route path="/add-study-plan" component={AddStudyPlanPage} />
            <Route path="/goal-tracker" component={GoalTrackerPage} />
            <Route path="*" component={() => <h2>404 Page Not Found</h2>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default StudyPlannerApp;