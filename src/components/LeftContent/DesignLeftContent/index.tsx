import React from 'react';
import {Classes, Icon, InputGroup, Menu, MenuItem, Tab, Tabs} from "@blueprintjs/core";
import {Left} from "react-spaces";
import './index.less'
import classNames from "classnames";
import {ContextMenu2} from "@blueprintjs/popover2";
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {TreeItemProps} from "@material-ui/lab/TreeItem/TreeItem";
import useProjectStore from "@/store/project/useProjectStore";
import shallow from "zustand/shallow";
import {IconName} from "@blueprintjs/icons";
import {MaybeElement} from "@blueprintjs/core/src/common/index";
import useTabStore from "@/store/tab/useTabStore";

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    borderTopRightRadius: theme.spacing(1),
    borderBottomRightRadius: theme.spacing(1),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    flex: 'auto',
    width: '88%',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '80px',
  },
}));

interface StyledTreeItemProps extends TreeItemProps {
  bgColor?: string,
  color?: string,
  labelIcon: IconName | MaybeElement,
  labelInfo?: number,
  labelText: string,
}

const renderRightContext = <Menu>
    <MenuItem icon="add" text="新增"/>
    <MenuItem icon="edit" text="重命名"/>
    <MenuItem icon="trash" text="删除"/>
    <MenuItem icon="duplicate" text="复制"/>
    <MenuItem icon="cut" text="剪切"/>
    <MenuItem icon="clipboard" text="粘贴"/>
  </Menu>
;

const StyledTreeItem = (props: StyledTreeItemProps) => {
  const classes = useTreeItemStyles();
  const {labelText, labelIcon, labelInfo, color, bgColor, ...other} = props;

  return (
    <ContextMenu2 content={renderRightContext}>
      <TreeItem
        label={
          <div className={classes.labelRoot}>
            <Icon icon={labelIcon} className={classes.labelIcon}/>
            <Typography variant="body2" className={classes.labelText}>
              {labelText}
            </Typography>
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          </div>
        }
        title={labelText}
        classes={{
          root: classes.root,
          content: classes.content,
          expanded: classes.expanded,
          selected: classes.selected,
          group: classes.group,
          label: classes.label,
        }}
        {...other}
      />
    </ContextMenu2>
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.number,
  labelText: PropTypes.string.isRequired,
};


export type DesignLeftContentProps = {};

const DesignLeftContent: React.FC<DesignLeftContentProps> = (props) => {

  const {modules} = useProjectStore(state => ({modules: state.project?.projectJSON?.modules}), shallow);
  console.log('modules139', modules)
  const {tabDispatch} = useTabStore(state => ({tableTabs: state.tableTabs, tabDispatch: state.dispatch}));


  return (
    <Left size="10%">
      <Tabs
        id="navbar"
        animate={false}
        large={true}
        renderActiveTabPanelOnly={true}
        className="left-table-tab"
      >
        <Tab id="table" title="数据表"></Tab>
        <Tab id="domain" title="数据域"/>
      </Tabs>
      <InputGroup
        className={classNames(Classes.ROUND, "table-search-input")}
        asyncControl={true}
        leftIcon="search"
        placeholder=""
      />
      <TreeView
        className="root"
        defaultExpanded={['3']}
        defaultCollapseIcon={<ArrowDropDownIcon/>}
        defaultExpandIcon={<ArrowRightIcon/>}
        defaultEndIcon={<div style={{width: 24}}/>}
      >
        {modules?.map((module: any) => {
          return <StyledTreeItem key={module.name}
                                 nodeId={module.name}
                                 labelText={module.name}
                                 labelIcon={"database"}
                                 labelInfo={module?.entities?.length}
                                 onClick={() => tabDispatch.setCurrentModule(module.name)}>
            {module?.entities?.map((entity: any) => {
              return <StyledTreeItem key={`${module.name}###${entity.title}`}
                                     nodeId={`${module.name}###${entity.title}`} labelText={entity.title}
                                     labelIcon={"th"} labelInfo={entity?.fields?.length}
                                     onClick={() => tabDispatch.addTab({module: module.name, entity: entity.title})}/>
            })}
          </StyledTreeItem>;
        })}

      </TreeView>
    </Left>
  )
};

export default React.memo(DesignLeftContent)
