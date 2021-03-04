import React, { FC } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
    inverted?: boolean;
    content?: string;
}

const LoadingSpinner: FC<Props> = ({ inverted = true, content = 'Loading...' }) => {
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    );
}

export default LoadingSpinner;
