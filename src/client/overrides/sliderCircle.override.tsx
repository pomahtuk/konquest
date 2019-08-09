import React from "react";
import { SharedProps, SliderOverrides } from "baseui/slider";

const sliderCircle: SliderOverrides = {
  InnerThumb: ({ $value, $thumbIndex }: SharedProps) => <React.Fragment>{$value[$thumbIndex]}</React.Fragment>,
  ThumbValue: () => null,
  Thumb: {
    style: () => ({
      height: "36px",
      width: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderTopLeftRadius: "36px",
      borderTopRightRadius: "36px",
      borderBottomRightRadius: "36px",
      borderBottomLeftRadius: "36px",
      borderColor: "#ccc",
      borderSize: "3px",
      borderStyle: "solid",
      backgroundColor: "#fff"
    })
  }
};

export default sliderCircle;
