import TableCompare from './TableCompare';
import { Table } from './TableCompare.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/TableCompare',
	component: TableCompare,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <TableCompare {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const TableCompareDark = Template.bind({});

TableCompareDark.args = {
	...Table,
};
