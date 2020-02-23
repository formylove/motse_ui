import {
  observable, action, runInAction, 
} from 'mobx';
import {Modal} from 'antd';


const {confirm} = Modal;

export class CardsStore {
  private static instance: CardsStore;

  public static getInstance(): CardsStore {
    if (!CardsStore.instance) {
      CardsStore.instance = new CardsStore();
      }

    return CardsStore.instance;
    }
    @observable currentStep = 1;


    @observable isSucceed = false;

    @action
    init() {
      this.isSucceed = false;
      this.currentStep = 1;
    }

    @action
    setIsSucceed(value: boolean) {
      this.isSucceed = value;
    }

   
    @action
    setCurrentStep = (value: number): void => {
      this.currentStep = value;
    }




}

export const cardsStore = CardsStore.getInstance();
