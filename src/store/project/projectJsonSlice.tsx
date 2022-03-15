import {GetState, SetState} from "zustand";
import {ProjectState} from "@/store/project/useProjectStore";
import produce from "immer";
import ModulesSlice from "@/store/project/modulesSlice";
import DataTypeDomainsSlice from "@/store/project/dataTypeDomainsSlice";
import ProfileSlice from "@/store/project/profileSlice";
import DatabaseDomainsSlice from "@/store/project/databaseDomainsSlice";
import useGlobalStore from "@/store/global/globalStore";
import {State} from "zustand/vanilla";
import ExportSlice from "@/store/project/exportSlice";

export type IProjectJsonSlice = {}

export interface IProjectJsonDispatchSlice {
  setProjectJson: (value: any) => void;
  setModules: (value: any) => void;
  setDataTypeDomains: (value: any) => void;
  setProfile: (value: any) => void;
  getGlobalStore: () => State;
};

const globalState = useGlobalStore.getState();

const ProjectJsonSlice = (set: SetState<ProjectState>,get:GetState<ProjectState>) => ({
  setProjectJson: (value: any) => set(produce(state => {
    state.project.projectJSON = value
  })),
  setModules: (value: any) => set(produce(state => {
    state.project.projectJSON = value
  })),
  setDataTypeDomains: (value: any) => set(produce(state => {
    state.project.projectJSON = value
  })),
  setProfile: (value: any) => set(produce(state => {
    state.project.projectJSON = value
  })),
  getGlobalStore: () => {
    return globalState;
  },
  ...ModulesSlice(set),
  ...DataTypeDomainsSlice(set),
  ...DatabaseDomainsSlice(set,get),
  ...ProfileSlice(set,get),
  ...ExportSlice(set,get),
});


export default ProjectJsonSlice;
