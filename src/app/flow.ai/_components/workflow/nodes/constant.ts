import { ComponentType } from "react";

/**
 *  node
 */
import { EndNode, IfElseNode, StartNode } from "./index.tsx";
import { BlockEnum } from "../types.ts";

export const NodeComponentMap: Record<string, ComponentType<any>> = {
  start: StartNode,
  end: EndNode,
  "if-else": IfElseNode,
};

export const CUSTOM_NODE = 'custom';

export const NODES_INITIAL_DATA = {
  [BlockEnum.Start]: {
    type: BlockEnum.Start,
    title: "开始",
    desc: "流程开始",
    defaultValue: {
      v: []
    }
  },
  [BlockEnum.End]: {
    type: BlockEnum.End,
    title: "结束",
    desc: "流程结束",
    defaultValue: {
      v: []
    }
  },
  [CUSTOM_NODE]: {
    type: CUSTOM_NODE,
    title: "自定义",
    desc: "自定义节点",
    defaultValue: {
      v: []
    }
  },
  [BlockEnum.IfElse]: {
    type: BlockEnum.IfElse,
    title: "条件",
    desc: "条件节点",
    defaultValue: {
      v: []
    }
  }
}