import React, {useEffect, ReactNode} from 'react';
import {observer} from 'mobx-react';
import {Button, Table, Modal} from 'antd';
import {APITokenStore} from '../../../../store/apiTokenStore';
import {useStores} from '../../../../common/util';
import APITokenModal from './APITokenModal';
import {useParams} from 'react-router-dom';
import './APIToken.scss'; 

const {confirm} = Modal;
const {Column} = Table;

type ApplicationDetailParams = {
  type: string;
  applicationId: string;
}

const APIToken = observer(() => {
  const {applicationId} = useParams<ApplicationDetailParams>();
  const apiTokenStore = useStores<APITokenStore>('apiTokenStore');
  apiTokenStore.applicationId = applicationId;

  useEffect(() => {
    apiTokenStore.init();
  }, []);


  return (
    <div className="application-api-token">
      <Button
        className="add-api-token"
        type="primary"
        onClick={apiTokenStore?.showModal}>Create API Token</Button>
      <div className="tip">An easy to use UI to help administrators manage user identities including password resets,
            creating and provisioning, blocking and deleting users.</div>
      <Table
        dataSource={apiTokenStore.tokenData}
        rowKey={(record): string => record.id}>
        <Column
          title='Key Name'
          dataIndex='name'
          key='name'
          align='center'
        />
        <Column
          title='API key'
          dataIndex='apiKey'
          key='apiKey'
          align='center'
        />
        <Column
          title='Created'
          dataIndex='creationDate'
          key='creationDate'
          align='center'
        />
        <Column
          title='Expires'
          dataIndex='expire'
          key='expire'
          align='center'
        />
        <Column
          title="Operation"
          render={(text: any, record: any): ReactNode => (
            <Button
              type="danger"
              onClick={(): void => {
                confirm({
                  content: 'Are you sure to revoke this token?',
                  okText: 'Revoke',
                  okType: 'danger',
                  cancelText: 'Cancel',
                  onOk: () => apiTokenStore.deleteData(record.id),
                });
              }}
            >
                Revoke
            </Button>
          )}
        />
      </Table>
      <APITokenModal></APITokenModal>
    </div>
  );
});

export default APIToken;
