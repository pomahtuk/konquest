import React, { ReactElement } from "react";
import { SharedProps, SliderOverrides } from "baseui/slider";
import { StyleObject } from "styletron-react";

const InnerThumb = ({ $value, $thumbIndex }: SharedProps): ReactElement => <>{$value[$thumbIndex]}</>;

const sliderCircle: SliderOverrides = {
  InnerThumb,
  ThumbValue: (): null => null,
  Thumb: {
    style: (): StyleObject => ({
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
