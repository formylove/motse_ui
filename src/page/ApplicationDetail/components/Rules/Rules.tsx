// TODO: Assign rule modal input suggestions

import React, {useEffect, ReactNode} from 'react';
import {Button, Table, Modal, Select} from 'antd';
import {observer} from 'mobx-react';
import {AppRuleStore} from '../../../../store/appRuleStore';
import {useStores} from '../../../../common/util';
import {useParams} from 'react-router-dom';
import './Rules.scss';
import {ColumnProps} from 'antd/lib/table';
const {confirm} = Modal;
const {Option} = Select;

type ApplicationDetailParams = {
  type: string;
  applicationId: string;
};


const Rules = observer(() => {
  const {applicationId} = useParams<ApplicationDetailParams>();
  const appRuleStore = useStores<AppRuleStore>('appRuleStore');
  appRuleStore.applicationId = applicationId;

  useEffect(() => {
    appRuleStore.init();
  }, []);

  const columns: ColumnProps<Rule>[] = [
    {
      title: 'Rule Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
    },
    {
      title: 'Operation',
      align: 'center',
      render: (text: any, record: any): ReactNode => (
        <div className="button-container">
          {/* <Button onClick={(): void => appRuleStore.showModal(record)}>
            Edit
          </Button> */}
          <Button
            type="danger"
            onClick={(): void => {
              confirm({
                content: `Are you sure to delete this rule? 
                  It can only delete the assignment, if you want to delete the rule record, please go to Rules page`,
                okText: 'Delete',
                okType: 'danger',
                cancelText: 'Cancel',
                onOk: () => appRuleStore.deleteData(record.id),
              });
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="application-rules">
      <Button
        className="add-rules"
        type="primary"
        onClick={appRuleStore?.showModal}
      >
        Assign Rule
      </Button>
      <div className="tip">
        An easy to use UI to help administrators manage user identities
        including password resets, creating and provisioning, blocking and
        deleting users.
      </div>
      <Table
        columns={columns}
        dataSource={appRuleStore.rules}
        rowKey={(record): string => record.id}
      ></Table>
      <Modal
        visible={appRuleStore.ruleModalVisible}
        onCancel={appRuleStore.handleCancel}
        onOk={appRuleStore.handleOk}
        okText="Assign"
        cancelText="Cancel"
        title="Assign a rule"
        destroyOnClose>
        <p>To assign a new policy, fill out the form below.</p>
        <Select
          style={{width: '100%'}}
          onChange={(value: string) => {
            appRuleStore.ruleId = value;
          } }
        >
          {
            appRuleStore.allRules.map((rule) => (
              <Option value={rule.id} key={rule.id}>{rule.name}</Option>
            ))
          }
        </Select>
      </Modal>
    </div>
  );
});

export default Rules;
