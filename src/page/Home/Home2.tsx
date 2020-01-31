import React, {Component} from 'react';
import './Home2.scss';
import {navigate} from '../../common/util';

export default class Home extends Component {
  render() {
    return (
      <div className="merlin-home">
        <div className="merlin-header-container">
          <div className="left-container">
            <div className="title">Datawiza</div>
            <div className="sub-title">
              <li>Seamlessly Integrate Identity Providers to Applications</li>
              <li>Granular Access Control to Applications and APIs</li>
            </div>
          </div>
          <div className="right-container">
            <div className="title title-dark">Create a new Application</div>
            <div className="content">Get started with Datawiza Merlin by creating a application and enjoy the convenience right now</div>
            <div
              className="button"
              onClick={() => navigate('/add-application')}
            >Get started</div>
          </div>
        </div>
        <div className="merlin-content-container">
          <div className="title-dark">How it works</div>
          <div className="left-container content-item">
            <div className="content">
              <div className="before-app-mesh desc-item">
                <div className="desc-title title-dark">Before Merlin</div>
                <div className="desc-sub-title sub-title-dark">Each Identity Provider should be integrated, configured and maintained manually.</div>
                <div className="desc-content">
                  <img src={require('../../assets/images/before.jpg')} />
                </div>
              </div>
              <div className="divide" />
              <div className="after-app-mesh desc-item">
                <div className="desc-title title-dark">After Merlin</div>
                <div className="desc-sub-title sub-title-dark">Now all these stuffs are taken by us, you can focus on your core business.</div>
                <div className="desc-content">
                  <img src={require('../../assets/images/after.jpg')} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
