import React, {FunctionComponent, ReactNode, useEffect} from 'react';
import {Table, Button, Tooltip, Modal, Tag} from 'antd';
import IconFont, {TYPE} from '../../../component/IconFont/IconFont';
import {navigateInLayout, useStores, observer} from '../../../common/util';
import {RuleStore, ruleStore} from '../../../store/ruleStore';
import {ColumnProps} from 'antd/lib/table';

const {Column} = Table;
const {confirm} = Modal;

const RulesTable: FunctionComponent = observer(() => {
  const ruleStore = useStores<RuleStore>('ruleStore');

  const columns: ColumnProps<Rule>[] = [
    {
      title: 'Rule Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Conditions',
      dataIndex: 'tags',
      key: 'tags',
      align: 'center',
      render: (tags: Array<string>): ReactNode => (
        <span>
          {tags.map((tag, index) => {
          // Set the tag color
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
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
      title: '',
      align: 'center',
      render: (text: any, record: any): ReactNode => (
        <div className="button-container">
          <Button onClick={(): void => console.log(record)}>
            Edit
          </Button>
          <Button
            type="danger"
            onClick={(): void => {
              confirm({
                content: 'Are you sure to delete this rule?',
                okText: 'Delete',
                okType: 'danger',
                cancelText: 'Cancel',
                onOk: () => ruleStore.deleteRuleData(record.id),
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
    <Table
      columns={columns}
      dataSource={ruleStore.ruleData}
      rowKey={(record): string => record.id}
    />
  );
});

export default RulesTable;
