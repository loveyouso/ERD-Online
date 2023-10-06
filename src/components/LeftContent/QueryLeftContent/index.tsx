import React from 'react';

import "./index.less";
import {Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import shallow from "zustand/shallow";
import QueryTree from "@/components/LeftContent/QueryLeftContent/component/QueryTree";
import useQueryStore from "@/store/query/useQueryStore";


export type QueryLeftContentProps = {
  collapsed: boolean | undefined;
};

const QueryLeftContent: React.FC<QueryLeftContentProps> = (props) => {
    const {queryDispatch} = useQueryStore(state => ({
      queryDispatch: state.dispatch
    }), shallow);

    return (
      props.collapsed ? <></> :
        <>
          <Input
            style={{
              borderRadius: 4,
              marginInlineEnd: 12,
            }}
            allowClear
            size={"small"}
            prefix={<SearchOutlined/>}
            placeholder="历史查询"
            onPressEnter={(e) => {
              // @ts-ignore
              queryDispatch.setQuerySearchKey(e.target?.value)
            }}
          />
          <QueryTree/>
        </>
    )
  }
;

export default React.memo(QueryLeftContent)
