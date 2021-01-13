import React from "react";
import { Button } from 'antd-mobile';
import styles from './index.less';

const Home = () => {
  return <div className={styles['home']}>
    <Button type="primary">primary</Button>
  </div>;
}

export default Home;