import React, {FunctionComponent} from 'react';
import {Spin} from 'antd';
import './MerlinLoading.scss';

interface MerlinLoadingProps {
    mask?: boolean;
    loading?: boolean;
}

export const MerlinLoading: FunctionComponent<MerlinLoadingProps> = ({loading = false, mask = false}) => {
  if (!loading) {
    return null;
  }

  return (
    <div className={`merlin-loading${mask ? ' mask' : ''}`}>
      <Spin size="large" />
    </div>
  );
};
