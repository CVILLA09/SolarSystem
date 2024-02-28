import { useHelper } from '@react-three/drei';
import AnimatedStars from './AnimatedStars';
import { useRef } from 'react';
import { Perf } from 'r3f-perf';

import CameraPositionLogging from './helpers/CameraPositionLogging';

import Earth from './scenes/earth/Earth';
import Sun from './scenes/sun/Sun';
import Mercury from './scenes/mercury/Mercury';
import Venus from './scenes/venus/Venus';
import Mars from './scenes/mars/Mars';
import Jupiter from './scenes/jupiter/Jupiter';
import Saturn from './scenes/saturn/Saturn';
import Uranus from './scenes/uranus/Uranus';
import Neptune from './scenes/neptune/Neptune';

const MainContainer = () => {
    return (
            <>
                <Perf />
                <CameraPositionLogging event="mousedown" />
                <AnimatedStars />
                <ambientLight intensity={0.02} />
                <Sun />
                <Mercury />
                <Venus />
                <Earth displacementScale={0.03}/>
                <Mars />
                <Jupiter />
                <Saturn />
                <Uranus />
                <Neptune />
            </>
    );
}

export default MainContainer;