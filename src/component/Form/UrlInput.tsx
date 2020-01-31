import React, {ReactNode, useState} from 'react';
import {Icon, Input, Button} from 'antd';

interface UrlInputProps {
  value?: string[];
  onChange?: any;
  canAdd?: boolean;
}

const UrlInput = ({value = [''], onChange, canAdd}: UrlInputProps) => {
  const [urlList, setUrlList] = useState(value);

  return (
    <div className="url-input-item">
      {
        urlList?.length > 0 && urlList?.map((item, index) => (
          <div className="url-input-container" key={index}>
            <Input
              value={item}
              placeholder="https://dev-12345.okta.com/callback"
              onChange={(e) => {
                urlList[index] = e.target.value;
                setUrlList([...urlList]);
                onChange(urlList);
              }}
            />
            {urlList.length > 1 && <Icon
              className="delete-icon"
              type="close"
              onClick={() => {
                const temp = [...urlList];
                temp.splice(index, 1);
                setUrlList(temp);
                onChange(temp);
              }}
            />}
          </div>
        ))
      }
      {
        canAdd && <Button
          onClick={() => {
            setUrlList([...urlList, '']);
            onChange([...urlList, '']);
          }}
        >Add URl</Button>
      }
    </div>
  );
};


UrlInput.defaultProps = {
  canAdd: true,
  value: [''],
};

export default UrlInput;
