// src/index.js
import { requireNativeComponent, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

const NativeWebView = requireNativeComponent('MyRaiidrWebView');

export default function RaiidrWebView({
    source,
    suppressNavigationEvents = false,
    descendantFocusability = 'afterDescendants',
    style,
    onNavigationStateChange,
}) {
    return (
        <NativeWebView
            source={source}
            suppressNavigationEvents={suppressNavigationEvents}
            descendantFocusability={descendantFocusability}
            style={style}
            onNavigationStateChange={onNavigationStateChange}
        />
    );
}

RaiidrWebView.propTypes = {
    source: PropTypes.shape({
        uri: PropTypes.string.isRequired,
    }).isRequired,
    suppressNavigationEvents: PropTypes.bool,
    descendantFocusability: PropTypes.oneOf([
        'blockDescendants',
        'beforeDescendants',
        'afterDescendants',
    ]),
    style: ViewPropTypes.style,
    onNavigationStateChange: PropTypes.func,
};
