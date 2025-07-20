import { UserOutlined } from '@ant-design/icons';
import { FaPaw } from 'react-icons/fa';
import { Input } from 'antd';

export const Inputemail = ({ className, value, name, placeholder, onChange }) => {
  
  return (
     
    <Input
    className = {className}
      value = {value}
      name = {name}
      placeholder = {placeholder}
      onChange={onChange}
      
    />
  );
};
