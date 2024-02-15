import React, { PureComponent } from 'react'
import { Circle } from 'react-konva';

class ColoredCircle extends PureComponent {
    static defaultProps = {
        color: 'red',
        x: 0,
        y: 0
    }
    render() {
        return (
            <Circle
                x={this.props.x}
                y={this.props.y}
                radius={20}
                fill={this.props.color}
                shadowBlur={2}
            />
        );
    }
}

export default ColoredCircle