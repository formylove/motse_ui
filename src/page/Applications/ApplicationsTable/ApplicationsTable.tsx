import React, {FunctionComponent, ReactNode} from 'react';
import {Table, Button, Tooltip} from 'antd';
import IconFont, {TYPE} from '../../../component/IconFont/IconFont';
import {navigateInLayout, useStores, observer} from '../../../common/util';
import * as ApplicationMgmtRes from '../../../services/model/ApplicationMgmtRes';
import {ApplicationsStore} from '../../../store/applicationsStore';

const {Column} = Table;

const colorObj = {
  OK: ['green', 'Online'],
  INACTIVE: ['grey', 'Offline'],
  ERROR: ['red', 'Error'],
};

const ApplicationsTable: FunctionComponent = observer(() => {
  const applicationsStore = useStores<ApplicationsStore>('applicationsStore');
  const data: ApplicationMgmtRes.Application[] | undefined = applicationsStore.applicationListData.data;

  return (
    <Table
      rowKey={(record): string => record.id}
      pagination={{
        current: applicationsStore.applicationListData.pageNum,
        total: applicationsStore.applicationListData.totalElements,
        pageSize: applicationsStore.applicationListData.pageSize,
        onChange: (page): void => applicationsStore.getApplicationList((page - 1).toString()),
      }}
      dataSource={data}>
      <Column
        title="Application"
        align="center"
        dataIndex="name"
        key="name"
        render={(text, record: ApplicationMgmtRes.Application): ReactNode => (
          <div className="application-table-detail">
            <IconFont className="type-icon" type={TYPE[record.platform]} />
            <div className="right-container">
              <div
                className="title"
                onClick={(): void => {
                  navigateInLayout(`/application-detail/${record.id}/general`);
                }}>
                {text}
              </div>
              <div className="type">{record.platform}</div>
            </div>
          </div>
        )} />
      <Column
        title="Client ID"
        align="center"
        dataIndex="clientId"
        key="clientId" />
      <Column
        title="Status"
        align="center"
        dataIndex="statusLight"
        key="Status"
        render={(text: 'OK'|'INACTIVE'|'ERROR'): ReactNode => {
          return (
            <div className="status-item">
              <div className="ball" style={{background: `${colorObj[text][0]}`}} />
              <div>{colorObj[text][1]}</div>
            </div>
          );
        }}
      />
      <Column
        title="Operation"
        align="center"
        dataIndex="operation"
        key="operation"
        render={(text, record: ApplicationMgmtRes.Application): ReactNode => (
          <div className="operation-container">
            <Tooltip title="General">
              <Button
                onClick={(): void => {
                  navigateInLayout(`/application-detail/${record.id}/general`);
                }}
                icon="profile" />
            </Tooltip>
            <Tooltip title="Rules">
              <Button
                onClick={(): void => {
                  navigateInLayout(`/application-detail/${record.id}/rules`);
                }}
                icon="setting" />
            </Tooltip>
            <Tooltip title="API Token">
              <Button
                onClick={(): void => {
                  navigateInLayout(`/application-detail/${record.id}/apitoken`);
                }}
                icon="key" />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                onClick={(): void => applicationsStore.deleteApplication(record.id)}
                icon="delete" type="danger" />
            </Tooltip>
          </div>
        )}
      />
    </Table>
  );
});

export default ApplicationsTable;
