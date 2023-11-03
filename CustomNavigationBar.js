import React from "react";
import { useState } from "react";
import { Text,Appbar, Menu} from "react-native-paper";
import { getHeaderTitle } from '@react-navigation/elements';

const CustomNavigationBar = ({
    navigation,
    route,
    options,
    back,
}) => {
    const [visible, setVisible] = React.useState(false);
    const openMenu = ()=> setVisible(true);
    const closeMenu = ()=> setVisible(false);

    const title = getHeaderTitle(options, route.name);
    return (
        <Text></Text>
    );
}

export default CustomNavigationBar