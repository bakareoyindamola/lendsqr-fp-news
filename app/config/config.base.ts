export interface ConfigBaseProps {
  persistNavigation: 'always' | 'dev' | 'prod' | 'never';
  catchErrors: 'always' | 'dev' | 'prod' | 'never';
}

export type PersistNavigationConfig = ConfigBaseProps['persistNavigation'];

const BaseConfig: ConfigBaseProps = {
  persistNavigation: 'always',
  catchErrors: 'always',
};

export default BaseConfig;
