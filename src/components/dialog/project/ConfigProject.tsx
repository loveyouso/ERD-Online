import React from 'react';
import {Button} from "antd";
import * as cache from "@/utils/cache";
import {history} from "@@/core/history";

export type ConfigProjectProps = {
  project: any;
  type: number;
};

const ConfigProject: React.FC<ConfigProjectProps> = (props) => {


  return (<>
    <Button type="primary" ghost onClick={() => {
      cache.setItem("projectId", props.project.id);
      history.push({
        pathname: '/project/group/setting?projectId=' + props.project.id
      });
    }}>
      权限配置
    </Button>
  </>);
}

export default React.memo(ConfigProject)
