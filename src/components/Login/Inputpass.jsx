
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';

export const Inputpass = ({className, value, name, placeholder, onChange}) => {
  
  return (
      <Input.Password
      className = {className}
      value = {value}
      name = {name}
      placeholder = {placeholder}
      onChange = {onChange}
        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
  );
};
