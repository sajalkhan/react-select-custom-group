import React from "react";
import { mapModifiers } from "../../libs/component";
import "./index.scss";

export const ICON_SHAPES = [
  "add-item",
  "alert",
  "arrow-down",
  "arrow-down-white",
  "arrow-left",
  "arrow-left-white",
  "arrow-right",
  "arrow-right-white",
  "arrow-up",
  "close-bold",
  "check-purple",
  "check-white",
  "close",
  "close-hover",
  "dot-action",
  "edit",
  "menu",
  "news",
  "waiting",
  "remand",
  "draft",
  "download",
  "download-disabled",
  "in-progress",
  "approval",
  "denial",
  "request",
  "request-list",
  "approval-list",
  "labor-menu",
  "settings",
  "avatar",
  "request-list-selected",
  "approval-list-selected",
  "labor-menu-selected",
  "settings-selected",
  "news-selected",
  "avatar-selected",
  "search",
  "search-white",
  "calendar",
  "back",
  "back-white",
  "link",
  "link-new-window",
  "help",
  "status-a",
  "status-b",
] as const;

export type IconShape = typeof ICON_SHAPES[number];

export interface IconProps {
  name: typeof ICON_SHAPES[number];
  onClick?: React.MouseEventHandler;
}

export const Icon: React.FC<IconProps> = ({ name, onClick }) => (
  <i className={mapModifiers("a-icon", name)} onClick={onClick} />
);
