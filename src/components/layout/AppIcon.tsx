import type React from 'react';
import Square2x2Icon from '../icons/Square2x2';
import SettingIcon from '../icons/Setting';

type AppIconProps = {
  name: string;
};

const AppIcon: React.FC<AppIconProps> = ({ name }) => {
  switch (name) {
    case 'Home':
      return <Square2x2Icon className="w-5 h-5" />;
    case 'Settings':
      return <SettingIcon className="w-5 h-5" />;
    default:
      return <Square2x2Icon className="w-5 h-5" />;
  }
};

export default AppIcon;
