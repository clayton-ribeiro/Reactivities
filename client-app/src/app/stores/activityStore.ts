import { makeAutoObservable, runInAction } from 'mobx';
import { v4 as uuid } from 'uuid'
import agent from '../api/agent';
import { Activity } from '../models/activity';

class ActivityStore {
  activities: Activity[] = [];
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadinginitial = false;


  constructor() {
    makeAutoObservable(this);
  }

  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      const activities = await agent.Activities.list();
      activities.forEach(element => {
        this.activities.push(element);
      });
      this.setLoadingInitial(false);


    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  }

  setLoadingInitial = (state: boolean) => {
    this.loadinginitial = state;
  }

  selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find(a => a.id === id);
  }

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined
  }

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
  }

  closeForm = () => {
    this.editMode = false;
  }

  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activities.push(activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });

    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

}

export default ActivityStore;