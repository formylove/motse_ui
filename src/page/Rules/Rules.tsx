
import React, {FunctionComponent, useEffect} from 'react';
import {Icon, Table, Button} from 'antd';
import './Rules.scss';
import {navigate, navigateInLayout, useStores} from '../../common/util';
import RulesTable from './components/RulesTable';
import {inject, observer} from 'mobx-react';
import {RuleStore, ruleStore} from '../../store/ruleStore';


const Policies: FunctionComponent = observer(() => {
  const ruleStore = useStores<RuleStore>('ruleStore');
  useEffect(() => {
    ruleStore.init();
  }, []);
  return (
    <div className="container">
      <div className="top-control" onClick={() => navigateInLayout('/home')}>
        <Icon className="left-icon" type="left" />
        <span>Home</span>
      </div>
      <div className="header">
        <div className="left-container">
          <div className="title title-dark">Rules</div>
          <div className="sub-title">The access policy that will be used to validate every user session.</div>
        </div>
        <div className="right-container">
          <div className="add-application" onClick={() => navigateInLayout('/rules/create')}>
            <Icon className="plus-icon" type="plus" />
            <span>Create Rule</span>
          </div>
        </div>
      </div>
      <div className="list">
        <RulesTable />
      </div>
    </div>
  );
});

export default Policies;

