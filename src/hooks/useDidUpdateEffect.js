import {useEffect, useRef} from "react";

function useDidUpdateEffect(fn, inputs) {
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current)
            fn();
        else
            didMountRef.current = true;
        // eslint-disable-next-line
    }, inputs);
}

export {useDidUpdateEffect};
