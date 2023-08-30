import React, { useState } from "react";

import { INavBarProps } from "../interfaces/NavBar.Interface";
import { useWindowDimensions } from "react-native";

const NavBar = ({ navigation, logout, hidden = false }: INavBarProps) => {

  const layout = useWindowDimensions();

  

}