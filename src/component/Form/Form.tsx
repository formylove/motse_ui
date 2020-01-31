import React, {FunctionComponent, ReactElement} from 'react';
import {useForm, OnSubmit, Controller} from 'react-hook-form';
import './Form.scss';
import classnames from 'classnames';
import {Button} from 'antd';

interface FormProps {
  defaultValues?: object;
  onSubmit: OnSubmit<Record<string, any>>;
  className?: string;
  children: React.ReactElement<FormItemProps> | React.ReactElement<FormItemProps>[];
}

export default function Form({defaultValues, children, onSubmit, className = ''}: FormProps) {
  const methods = useForm({defaultValues});
  const {handleSubmit} = methods;

  return (
    <form className={`merlin-react-hook-form ${className}`} onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children) ?
        children.map((child) => {
          console.log(child);
          return child.props.name ?
            React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                errors: methods.errors,
                key: child.props.name,
              },
            }) :
            child;
        }) :
        children}
    </form>
  );
}

interface FormItemProps {
  register?: any;
  errors?: any;
  name: string;
  className?: string;
  [propName: string]: any;
}

export function Input({register, name, className = '', ...rest}: FormItemProps) {
  return <input className={`merlin-react-hook-form-input ${className}`} name={name} ref={register} {...rest} />;
}

interface InputItemProps extends FormItemProps {
  title: string;
}

export function InputItem({title, name, register, errors, className = '', ...rest}: InputItemProps) {
  return (
    <div className={`merlin-react-hook-form-input-item ${className}`}>
      <div className={`merlin-react-hook-form-input-item-name ${className}`}>{title}</div>
      <input className={classnames({
        'merlin-react-hook-form-input-item-input': true,
        'has-error': !!errors[name],
      })} name={name} ref={register} {...rest} />
    </div>
  );
}
