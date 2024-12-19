import LineChartGraph from './LineChartGraph';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/LineChartGraph',
	component: LineChartGraph,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <LineChartGraph {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Small LineChartGraph
export const LineChartGraphSimple = Template.bind({});

LineChartGraphSimple.args = {
	dataPoints: ['$0', '$1,000,000', '$2,000,000', '$3,000,000', '$4,000,000'],
	labels: ['After 6-months', 'After 1-years', 'After 2-years', 'After 3-years'],
	scores: [546368.7167999998, 1138268.16, 2276536.32, 3414804.4799999995],
	stepsPoint: 1000000,
};
