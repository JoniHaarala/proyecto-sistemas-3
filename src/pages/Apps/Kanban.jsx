import React from 'react';
import { kanbanData } from '../../data/configData';
import { Header } from '../../components';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";

class Kanban extends React.Component {
  constructor() {
    super(...arguments);
    this.data = extend([], kanbanData, null, true);
  }
  render() {
    return (
      <div>
        <Header category="Apps" title="Kanban" />
        <KanbanComponent id="kanban" keyField="Status" dataSource={this.data} cardSettings={{ contentField: "Summary", headerField: "Id" }}>
          <ColumnsDirective>
            <ColumnDirective headerText="To Do" keyField="Open" allowToggle={true}/>
            <ColumnDirective headerText="In Progress" keyField="InProgress" allowToggle={true}/>
            <ColumnDirective headerText="Testing" keyField="Testing" allowToggle={true} isExpanded={false}/>
            <ColumnDirective headerText="Done" keyField="Close" allowToggle={true}/>
          </ColumnsDirective>
        </KanbanComponent>
      </div>
    )

  }
}

export default Kanban;
