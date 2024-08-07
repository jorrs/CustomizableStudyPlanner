import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StudyPlanListView from './StudyPlanList';
import StudyPlanDetailView from './StudyPlanDetail';
import AddStudyPlanForm from './AddStudyPlan';
import GoalTrackerView from './GoalTracker';

class StudyPlannerApp extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={StudyPlanListView} />
            <Route path="/study-plan/:id" component={StudyPlanDetailView} />
            <Route path="/add-study-plan" component={AddStudyPlanForm} />
            <Route path="/goal-tracker" component={GoalTrackerView} />
            <Route path="*" component={() => <h2>404 Page Not Found</h2>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default StudyPlannerApp;