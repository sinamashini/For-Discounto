import { CommonActionTypes } from "./actions/Common.action";
import { SettingsActionTypes } from "./actions/Settings.action";

export type AppActions =
  | CommonActionTypes
  | SettingsActionTypes
