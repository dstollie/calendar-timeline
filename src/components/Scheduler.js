import React, {useState} from "react";
import Timeline, {CustomHeader, DateHeader, SidebarHeader, TimelineHeaders} from 'react-calendar-timeline'
import moment from 'moment'
import 'react-calendar-timeline/lib/Timeline.css'

const groups = [
    {id: 1, title: 'group 1', height: 50}, {id: 2, title: 'group 2', height: 50}];

const items = [
    {
        id: 1,
        group: 1,
        bgColor: '#5FD6AB',
        color: 'white',
        title: 'test',
        start_time: moment('29-09-2019', 'DD-MM-YYYY'),
        end_time: moment('04-10-2019', 'DD-MM-YYYY')
    }
];

const customTimeSteps = {
    second: 0,
    minute: 0,
    hour: 12,
    day: 1,
    month: 1,
    year: 1
};

const defaultTimeStart = moment()
    .startOf("week")
    .toDate();
const defaultTimeEnd = moment()
    .endOf("week")
    .toDate();

const itemRenderer = ({ item, timelineContext, itemContext, getItemProps, getResizeProps }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    const backgroundColor = itemContext.selected ? (itemContext.dragging ? "red" : item.selectedBgColor) : item.bgColor;
    const borderColor = itemContext.resizing ? "red" : item.color;
    return (
        <div
            {...getItemProps({
                style: {
                    backgroundColor,
                    color: item.color,
                    borderColor,
                    borderStyle: "solid",
                    borderWidth: 0,
                    borderRadius: 0,
                    borderLeftWidth: itemContext.selected ? 3 : 1,
                    borderRightWidth: itemContext.selected ? 3 : 1
                },
                onMouseDown: () => {
                    console.log("on item click", item);
                }
            })}
        >
            {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

            <div
                style={{
                    height: itemContext.dimensions.height,
                    overflow: "hidden",
                    paddingLeft: 3,
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                }}
            >
                {itemContext.title}
            </div>

            {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
        </div>
    );
};

function Scheduler() {

    // const timelineProperties = useState({
    //     groups,
    //     items
    // });

    return (
        <Timeline
            groups={groups}
            items={items}
            minZoom={24 * 60 * 60 * 1000}
            maxZoom={24 * 60 * 60 * 1000}
            defaultTimeStart={defaultTimeStart}
            defaultTimeEnd={defaultTimeEnd}
            timeSteps={customTimeSteps}
            itemHeightRatio={0.75}
            itemRenderer={itemRenderer}
            canMove={false}
            canResize={false}
            canChangeGroup={false}
            className='weekend'
        >
            <TimelineHeaders>
                <SidebarHeader/>
                <DateHeader unit="primaryHeader"/>
                <DateHeader unit="day" labelFormat="DD-MM-YYYY"/>
            </TimelineHeaders>
        </Timeline>
    );
}

export default Scheduler;
