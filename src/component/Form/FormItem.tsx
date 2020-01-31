import React, {FunctionComponent} from 'react';
import {Controller, ErrorMessage} from 'react-hook-form';
import './FormItem.scss';

interface FormItemProps {
  title: string;
  control: any;
  errors?: any;
  name: string;
  [propName: string]: any;
}

const FormItem: FunctionComponent<FormItemProps> = ({title, control, errors, name, children, ...rest}) => {
  return (
    <div className={'form-item'}>
      <div className={'form-item-container'}>
        <div className="form-title">{title}</div>
        <div className="form-content">
          <Controller
            as={children}
            control={control}
            name={name}
            {...rest}
          />
        </div>
      </div>
      <ErrorMessage name={name} errors={errors} as={<span className="error-tip" />} />
    </div>
  );
};

export default FormItem;
