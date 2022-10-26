import { Tabs } from "antd";
import React, { Children, useState } from "react";
const { TabPane } = Tabs;

export default function CinemaInfor() {

  const [tabPosition, setTabPosition] = useState('left');
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };

  let items_child = [
    {label: "Children 1_1 Label", key: "child1", children: "Children of children 1"},
    {label: "Children 1_2 Label", key: "child2", children: "Children of children 2"}
  ]

  let items_parent = [
    {
      label: "Tab 1", key: "1", children:
        <Tabs tabPosition="left" items={items_child}>
          {/* <TabPane tab="Child Tab 1" key="1">Child tab 1</TabPane>
          <TabPane tab="Child Tab 1_2" key="2">Child tab 1_2</TabPane> */}
        </Tabs>
    },
    { label: "Tab 2", key: "2", children: 'Content 2' }
  ]

  return <div className="bk-cinema mt-3 container px-5 py-5 mx-auto w-4/6 bg-slate-400">
    {/* <Tabs tabPosition="left">
      <TabPane tab="Tab 1" key="1">
        <Tabs tabPosition="left">
          <TabPane tab="Child Tab 1" key="1">Child tab 1</TabPane>
          <TabPane tab="Child Tab 1_2" key="2">Child tab 1_2</TabPane>
        </Tabs>
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        <Tabs tabPosition="left">
          <TabPane tab="Child Tab 2" key="2">Child tab 2</TabPane>
          <TabPane tab="Child Tab 2_3" key="3">Child tab 3</TabPane>
        </Tabs>
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        <Tabs tabPosition="left">
          <TabPane tab="Child Tab 3" key="3">Child tab 3</TabPane>
        </Tabs>
      </TabPane>
    </Tabs> */}
    <Tabs tabPosition="left" items={items_parent}></Tabs>
  </div>;
}
