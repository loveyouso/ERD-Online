import React from 'react';
import {ProForm, ProFormDigit, ProFormFieldSet, ProFormText, ProFormUploadButton} from "@ant-design/pro-components";
import * as cache from "@/utils/cache";
import {Button, message} from "antd";
import useProjectStore from "@/store/project/useProjectStore";
import shallow from "zustand/shallow";
import {CONSTANT} from "@/utils/constant";
import {Access, useAccess} from "@@/plugin-access";


export type DefaultSetUpProps = {};

const DefaultSetUp: React.FC<DefaultSetUpProps> = (props) => {
  const projectId = cache.getItem(CONSTANT.PROJECT_ID);
  const access = useAccess();

  const {projectDispatch, profile} = useProjectStore(state => ({
    projectDispatch: state.dispatch,
    profile: state.project?.projectJSON?.profile
  }), shallow);


  return (<>
    <ProForm
      initialValues={profile}
      onFinish={async (values: any) => {
        console.log(35, values);
        await projectDispatch.updateProfile(values);
        return true;
      }}
    >
      <ProFormText.Password
        width="lg"
        label="ERD秘钥"
        extra='仅用于ERD导入导出加密解密'
        name="erdPassword"
        placeholder="默认为ERDOnline"
      />
      <ProFormDigit
        width="lg"
        min={1}
        max={100}
        label="元数据表展示上限"
        extra='控制元数据表展示上限，默认展示30个表。当可见范围看不到表时，请使用元数据搜索功能；当元数据表很多时，可以减小此参数，加快页面渲染速度，减少卡顿。'
        name="tableLimit"
        placeholder="默认30，最小1，最大100"
      />
      <ProFormText
        width="lg"
        name="sqlConfig"
        label="SQL分隔符"
        extra='分隔每条往数据库执行的SQL'
        placeholder="默认为/*SQL@Run*/"
        formItemProps={{
          rules: [
            {
              max: 100,
              message: '不能大于 100 个字符',
            },
          ],
        }}
      />
      <ProFormText
        width="lg"
        name="moduleNameFormat"
        label="元数据->模块名显示格式"
        extra='模型->元数据中，模块名称显示格式：{name}显示英文名，{chnname}显示中文名，{name} {chnname}为英文和中文的组合名'
        placeholder="默认为 {name} {chnname}"
        formItemProps={{
          rules: [
            {
              max: 100,
              message: '不能大于 100 个字符',
            },
          ],
        }}
      />
      <ProFormText
        width="lg"
        name="tableNameFormat"
        label="元数据->表名显示格式"
        extra='模型->元数据中，表名称显示格式：{title}显示英文名，{chnname}显示中文名，{title} {chnname}为英文和中文的组合名'
        placeholder="默认为 {title} {chnname}"
        formItemProps={{
          rules: [
            {
              max: 100,
              message: '不能大于 100 个字符',
            },
          ],
        }}
      />
      <ProFormFieldSet
        label="WORD模板配置"
        extra="默认为系统自带的模板，如需修改，请先下载，再重新上传模板文件"
      >
        <Access
          accessible={access.canErdDocUploadwordtemplate}
          fallback={<></>}
        >
          <ProFormUploadButton
            max={1}
            name="wordTemplateConfig"
            fieldProps={{
              name: 'file',
              headers: {
                Authorization: 'Bearer 1'
              },
              onChange: (e) => {
                if (e.file.status == 'done') { //上传完成时
                  console.log(83, 'e.file', e);
                  if (e.file.response.code == 200) {
                    projectDispatch.updateWordTemplateConfig(e.file.response.data);
                  } else {
                    message.error(e.file.response.msg ?? '上传失败')
                  }
                } else if (e.file.status == 'error') { //上传错误时
                  message.error('上传失败')
                }
                //status状态：'error' | 'success' | 'done' | 'uploading' | 'removed';
              },
            }}
            action={`${API_URL}/ncnb/doc/uploadWordTemplate/${projectId}`}
          />
        </Access>
        <Access
          accessible={access.canErdDocDownloadwordtemplate}
          fallback={<></>}
        >
          <Button title='下载模板' onClick={() => projectDispatch.downloadWordTemplate()}>下载模板</Button>
        </Access>
      </ProFormFieldSet>

    </ProForm>
  </>);
}

export default React.memo(DefaultSetUp)
