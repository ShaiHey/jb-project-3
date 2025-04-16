// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';

interface PropsGraph {
    dataPoints: { label: string; y: number; }[]
}

function Graph({ dataPoints }: PropsGraph): JSX.Element {

    const options = {
        animationEnabled: true,
        theme: "light1",
        title:{
            text: "Vacation Report"
        },
        axisY: {
            includeZero: true,
            // interval: 1
        },
        axisX: {
            labelMaxWidth: 50,  
            labelWrap: true
        },
        data: [{
            type: "column",
            indexLabel: "{y}",
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints
        }]
    }

    const CanvasJSChart = CanvasJSReact.CanvasJSChart;

    return (
        <div className="Graph">
            <CanvasJSChart
                options={options}
                containerProps={{ width: '100%' }}
            />
        </div>
    )
}

export default Graph;