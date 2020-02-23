import React, { Component, FunctionComponent } from "react";
import { inject, observer } from "mobx-react";

import { CardsStore } from "../../store/cardsStore";

import "./Cards.scss";

interface CardsStoreProps {
  cardsStore: CardsStore;
}

@inject("cardsStore")
@observer
export default class Cards extends Component<CardsStoreProps> {
  render() {
    const { cardsStore } = this.props;
    return (
      <div
        id="cards"
        onClick={() => cardsStore.setCurrentStep(cardsStore.currentStep + 1)}
      >
        我是card列表,目前位置{cardsStore.currentStep}
      </div>
    );
  }
}
