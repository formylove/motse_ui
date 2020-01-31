import React, {Component} from 'react';
import './Home.scss';
import {navigate} from '../../common/util';

export default class Home extends Component {
  render(): React.ReactNode {
    return (
      <div className="merlin-home">
        <div className="merlin-header-container">
          <div className="left-container">
            <div className="title">Datawiza</div>
            <div className="sub-title">
              <li>Seamlessly Integrate Identity Providers to Applications</li> 
              <li>Granular Access Control to Applications and APIs</li> </div>
          </div>
          <div className="right-container">
            <div className="title">Create a New Application Integration</div>
            <div 
              className="button"
              onClick={(): void => navigate('/add-application')}
            >Get started</div>
          </div>
        </div>
        {/*
                <div className="merlin-content-container">
                    <div className="left-container content-item">
                        <div className="title">How it works</div>
                        <div className="content">
                            <div className="before-app-mesh desc-item">
                                <div className="desc-title">Before App Mesh</div>
                                <div className="desc-sub-title">Communications and monitoring are manually configured for every microservice.</div>
                                <div className="desc-content">
                                    <img src={require('../../assets/images/tttttt.png')} />
                                </div>
                            </div>
                            <div className="divide" />
                            <div className="after-app-mesh desc-item">
                                <div className="desc-title">After App Mesh</div>
                                <div className="desc-sub-title">App Mesh configures communications and monitoring for all microservices.</div>
                                <div className="desc-content">
                                    <img src={require('../../assets/images/tttttt.png')} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-container content-item">
                        <div className="title">Getting started</div>
                        <div className="content">
                            <div className="menu-item">User Guide</div>
                            <div className="menu-item">Step by step instructions</div>
                            <div className="menu-item">Step by step instructions</div>
                        </div>
                    </div>
                </div>
                */}
      </div>
    );
  }
}
